const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.post('/', async (req, res) => {
    const { title } = req.body;
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        res.status(401).json({ error: 'Unauthorized' });
    } else {
        const quiz = await prisma.quiz.create({
            data: { title, adminId: decoded.adminId }
        });
        res.json(quiz);
    }
});

app.get('/', async (req, res) => {
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        res.status(401).json({ error: 'Unauthorized' });
    } else {
        const quizzes = await prisma.quiz.findMany({
            where: { adminId: decoded.adminId }
        });
        res.json(quizzes);
    }
});

app.put('/', async (req, res) => {
    const { newtitle, quizId } = req.body;
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        res.status(401).json({ error: 'Unauthorized' });
    } else {
        const quiz = await prisma.quiz.update({
            where: { id: quizId },
            data: { title: newtitle }
        });
        res.json(quiz);
    }
});

app.get('/id/:id', async (req, res) => {
    const { id } = req.params;
    const quiz = await prisma.quiz.findUnique({
        where: { id: parseInt(id) }
    });
    if (!quiz) {
        res.status(404).json({ error: 'Quiz not found' });
    } else {
        const questions = await prisma.question.findMany({
            where: { quizId: parseInt(id) }
        });
        res.json({ quiz, questions });
    }
});

app.get('/active', async (req, res) => {
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        res.status(401).json({ error: 'Unauthorized' });
    } else {
        const quizzes = await prisma.quiz.findMany({
            where: { active: true }
        });
        res.json(quizzes);
    }
});

module.exports = {
    quizRoutes: app
}