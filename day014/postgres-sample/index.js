const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
dotenv.config();

const app = express();
const prisma = new PrismaClient();


app.use(express.json());
app.use(cors());

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });
    if (existingUser) {
        res.status(400).json({ error: 'User already exists' });
    } else {
        const user = await prisma.user.create({
            data: { name, email, password }
        });
        res.json(user);
    }
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { email, password }
    });
    if (user) {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        res.json({ token, message: 'Login successful' });
    } else {
        res.status(400).json({ error: 'Invalid credentials' });
    }
});

app.get('/profile', async (req, res) => {
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        res.status(401).json({ error: 'Unauthorized' });
    }else{
    const user = await prisma.user.findUnique({
        where: { id: decoded.userId }
        });
        res.json(user);
    }
});

app.post('/blog', async (req, res) => {
    const { title, content } = req.body;
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        res.status(401).json({ error: 'Unauthorized' });
    }else{
        const blog = await prisma.blog.create({
            data: { title, content, userId: decoded.userId }
        });
        res.json(blog);
    }
});

app.get('/blogs', async (req, res) => {
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        res.status(401).json({ error: 'Unauthorized' });
    }else{
        const blogs = await prisma.blog.findMany({
            where: { userId: decoded.userId }
        });
        res.json(blogs);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});




