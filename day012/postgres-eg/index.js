const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.connect().then((conn) => {
    console.log("Connected to the database");
    const app = express();

    app.use(express.json());

    app.get("/", (req, res) => {
        res.send("Hello World");
    });

    app.post("/signup", function (req, res) {
        const { username, password } = req.body;
        conn.query(`INSERT INTO users (username, password) VALUES ('${username}','${password}');`, function (err, result) {
            if (err) {
                res.status(500).send("Error creating user");
            } else {
                res.json({ message: "User created successfully"});
            }
        });
    });

    app.post("/signin", function (req, res) {
        const { username, password } = req.body;
        conn.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}';`, function (err, result) {
            const token = jwt.sign({ user_id: result.rows[0].id }, process.env.JWT_SECRET);
            if (err) {
                res.status(500).send("Error signing in");
            } else {
                res.json({ message: "User signed in successfully", token: token });
            }
        });
    });

    app.post("/todo", function (req, res) {
        const { title} = req.body;
        const user_id = jwt.verify(req.headers.token, process.env.JWT_SECRET).user_id;
        conn.query(`INSERT INTO todos (title, userid) VALUES ('${title}','${user_id}');`, function (err, result) {
            if (err) {
                res.status(500).send("Error creating todo");
            } else {
                res.json({ message: "Todo created successfully" });
            }
        });
    });

    app.get("/todos", function (req, res) {
        const user_id = jwt.verify(req.headers.token, process.env.JWT_SECRET).user_id;
        conn.query(`SELECT * FROM todos WHERE userid = '${user_id}';`, function (err, result) {
            if (err) {
                res.status(500).send("Error getting todos");
            } else {
                res.json({ message: "Todos fetched successfully", result: result.rows });
            }
        });
    });

    app.delete("/todos/:id", function (req, res) {
        const { id } = req.params;
        conn.query(`DELETE FROM todos WHERE id = ${id};`, function (err, result) {
            if (err) {
                res.status(500).send("Error deleting user");
            } else {
                res.json({ message: "User deleted successfully", result: result.rows });
            }
        });
    });

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}).catch((err) => {
    console.error("Error connecting to the database", err);
});

