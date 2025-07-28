const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const { signupSchema, signinSchema } = require('../middlewares/types');

dotenv.config();

const prisma = new PrismaClient();

const app = express();

app.post('/signup', async (req, res) => {
    const { username, password } = signupSchema.parse(req.body);
    if (!username || !password) {
        res.status(400).json({ error: 'Invalid credentials' });
    }
    const existingUser = await prisma.user.findUnique({
        where: { username }
    });
    if (existingUser) {
        res.status(400).json({ error: 'User already exists' });
    } else {
        const user = await prisma.user.create({
            data: { username, password }
        });
        res.json(user);
    }
});



app.post('/signin', async (req, res) => {
    const { username, password } = signinSchema.parse(req.body);
    if (!username || !password) {
        res.status(400).json({ error: 'Invalid credentials' });
    }
    const user = await prisma.user.findUnique({
        where: { username, password }
    });
    if (!user) {
        res.status(400).json({ error: 'Invalid credentials' });
    } else {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        res.json({ token, message: 'Login successful' });
    }
});



app.post('/adminsignup', async (req, res) => {
    const { username, password } = signupSchema.parse(req.body);
    if (!username || !password) {
        res.status(400).json({ error: 'Invalid credentials' });
    }
    const existingAdmin = await prisma.admin.findUnique({
        where: { username }
    });
    if (existingAdmin) {
        res.status(400).json({ error: 'Admin already exists' });
    } else {
        const admin = await prisma.admin.create({
            data: { username, password }
        });
        res.json(admin);
    }
});

app.post('/adminsignin', async (req, res) => {
    const { username, password } = signinSchema.parse(req.body);
    if (!username || !password) {
        res.status(400).json({ error: 'Invalid credentials' });
    }
    const admin = await prisma.admin.findUnique({
        where: { username, password }
    });
    if (!admin) {
        res.status(400).json({ error: 'Invalid credentials' });
    } else {
        const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET);
        res.json({ token, message: 'Login successful' });
    }
});
module.exports = {
    authRoutes: app
}
