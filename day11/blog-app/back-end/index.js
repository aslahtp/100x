const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());

const { userSchemazod, blogSchemazod } = require("./types");

const BlogSchema = new mongoose.Schema({
    username: String,
    password: String,
    blogs: [{
        id: Number,
        title: String,
        content: String,
    }],
});

const User = mongoose.model("users", BlogSchema);

app.get("/blogs", async (req, res) => {
    const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    const user = await User.findOne({ username: decoded.username });
    res.status(200).json({ blogs: user.blogs });
});

app.get("/blog", async (req, res) => {
    const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    const user = await User.findOne({ username: decoded.username });
    const blog = user.blogs.find((blog) => blog.id === parseInt(req.query.id));
    res.status(200).json({ blog });
});

app.get("/blog/:id", async (req, res) => {
    const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    const user = await User.find({ username: decoded.username });
    const blog = user.blogs.find((blog) => blog.id === req.params.id);
    res.status(200).json({ blog });
});

app.delete("/blog/:id", async (req, res) => {
    const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    const user = await User.findOne({ username: decoded.username });
    console.log(user);
    console.log(req.params.id);
    user.blogs = user.blogs.filter(blog => blog.id !== parseInt(req.params.id));
    await user.save();
    res.status(200).json({ message: "Blog deleted successfully" });
});

app.post("/blog", async (req, res) => {
    const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    const user = await User.findOne({ username: decoded.username });
    console.log(user);
    console.log(req.body);
    const newBlog = {   
        id: Date.now(),
        title: req.body.title,
        content: req.body.content
    };
    user.blogs.push(newBlog);
    await user.save();
    res.status(200).json({ message: "Blog created successfully" });
});

app.post("/signup", async (req, res) => {
    try {
        const { username, password } = userSchemazod.parse(req.body);

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists" });
        }

        const user = new User({ username: username, password: password, blogs: [] });
        await user.save();

        console.log("User created successfully");
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.log("User creation failed", err);
        res.status(400).json({ message: "User creation failed" });
    }
});

app.post("/signin", async (req, res) => {
    const { username, password } = userSchemazod.parse(req.body);
    const user = await User.findOne({ username, password });
    if (!user) {
        return res.status(406).json({ message: "User not found" });
    }
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
    res.status(200).json({ message: "Login successful", token });
});

app.post("/create-blog", async (req, res) => {
    const { username, title, content } = blogSchemazod.parse(req.body);
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    user.blogs.push({ id: Date.now(), title, content });
    await user.save();
    res.status(201).json({ message: "Blog created successfully" });
});

app.get("/", async (req, res) => {
    res.status(200).json({ message: "Server is running" });
});

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})