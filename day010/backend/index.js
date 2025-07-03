const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors());

const { userSchemazod, todoSchemazod } = require("./types");

// MongoDB connection with error handling
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    todos: [{
        id: { type: Number, required: true },
        title: { type: String, required: true }
    }]
});

const User = mongoose.model("User", userSchema);

// JWT Secret from environment
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

app.post("/signup", async (req, res) => {
    try {
        const { username, password } = userSchemazod.parse(req.body);

        // Input validation
        if (!username || !password) {
            return res.status(400).json({ message: "Given username and password have errors" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Create new user
        const newUser = new User({
            username,
            password, // In production, hash this password!
            todos: []
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
        console.log("New user created:", username);

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/signin", async (req, res) => {
    try {
        const { username, password } = userSchemazod.parse(req.body);

        // Input validation
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Find user in database
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate token
        const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({
            message: "User logged in successfully",
            token: token
        });
        console.log("User logged in:", username);

    } catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/todos", verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ todos: user.todos });
        console.log("Todos fetched for user:", req.user.username);

    } catch (error) {
        console.error("Get todos error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.delete("/todos/:id", verifyToken, async (req, res) => {
    try {
        const todoId = parseInt(req.params.id);
        if (isNaN(todoId)) {
            return res.status(400).json({ message: "Invalid todo ID" });
        }

        const user = await User.findOne({ username: req.user.username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.todos = user.todos.filter(todo => todo.id !== todoId);
        await user.save();

        res.status(200).json({ message: "Todo deleted successfully" });
        console.log("Todo deleted for user:", req.user.username);

    } catch (error) {
        console.error("Delete todo error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/todos", verifyToken, async (req, res) => {
    try {
        const { todo } = req.body;

        if (!todo || !todo.title) {
            return res.status(400).json({ message: "Todo title is required" });
        }

        const user = await User.findOne({ username: req.user.username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate new ID
        const newId = user.todos.length > 0 ? Math.max(...user.todos.map(t => t.id)) + 1 : 1;
        const newTodo = {
            id: newId,
            title: todo.title
        };

        user.todos.push(newTodo);
        await user.save();

        res.status(201).json({
            message: "Todo added successfully",
            todo: newTodo
        });
        console.log("Todo added for user:", req.user.username);

    } catch (error) {
        console.error("Add todo error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error("Unhandled error:", error);
    res.status(500).json({ message: "Internal server error" });
});

app.get("/", (req, res) => {
    console.log(process.env.MONGO_URL);
    res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});