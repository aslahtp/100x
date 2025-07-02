const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("MONGO_URL");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    todos: [{ id: Number, title: String }]
});

const User = mongoose.model("User", userSchema);

const users = [
    {
        username: "admin",
        password: "123456",
        todos: [{ id: 1, title: "Buy groceries" }, { id: 2, title: "Buy clothes" }, { id: 3, title: "Buy books" }]
    }
]

app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (user) {
        res.status(406).json({ message: "User already exists" });
        console.log("user exists");
    }
    else {
        users.push({ username, password, todos: [] });
        res.status(201).json({ message: "User created successfully" });
        console.log(users);
    }
});

app.post("/signin", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        res.status(400).json({ message: "User not found" });
    }
    else {
        token = jwt.sign({ username: user.username }, "secretKey");
        res.status(200).json({ message: "User logged in successfully", token: token });
    }
    console.log(token);
});

app.get("/todos", (req, res) => {
    const token = req.headers.token;
    const decoded = jwt.verify(token, "secretKey");
    const user = users.find(user => user.username === decoded.username);
    res.status(200).json({ todos: user.todos });
    console.log(user.todos);
});

app.delete("/todos/:id", (req, res) => {
    const token = req.headers.token;
    const decoded = jwt.verify(token, "secretKey");
    const user = users.find(user => user.username === decoded.username);
    const todoId = parseInt(req.params.id);
    user.todos = user.todos.filter(todo => todo.id !== todoId);
    res.status(200).json({ message: "Todo deleted successfully" });
});

app.post("/todos", (req, res) => {
    console.log(req.body);
    const token = req.headers.token;
    const decoded = jwt.verify(token, "secretKey");
    console.log(decoded);
    const user = users.find(user => user.username === decoded.username);
    user.todos.push(req.body.todo);
    res.status(200).json({ message: "Todo added successfully" });
    console.log(user.todos);
});



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});