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
    console.log(token)
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
            where: { id: quizId, adminId: parseInt(decoded.adminId) },
            data: { title: newtitle }
        });
        res.json(quiz);
    }
});

app.delete('/', async (req, res) => {
    const { id } = req.query;
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        res.status(401).json({ error: 'Unauthorized' });
    } else {
        try {
            // Use a transaction to delete all related records first, then the quiz
            const result = await prisma.$transaction(async (prisma) => {
                // Delete submissions related to this quiz
                await prisma.submission.deleteMany({
                    where: { quizId: parseInt(id) }
                });

                // Delete leaderboard entries related to this quiz
                await prisma.leaderboard.deleteMany({
                    where: { quizId: parseInt(id) }
                });

                // Delete questions related to this quiz
                await prisma.question.deleteMany({
                    where: { quizId: parseInt(id), adminId: parseInt(decoded.adminId) }
                });

                // Finally delete the quiz
                const quiz = await prisma.quiz.delete({
                    where: { id: parseInt(id), adminId: parseInt(decoded.adminId) }
                });

                return quiz;
            });

            res.json(result);
        } catch (error) {
            console.error('Error deleting quiz:', error);
            res.status(500).json({ error: 'Failed to delete quiz' });
        }
    }
});

app.get('/id/:id', async (req, res) => {
    const { id } = req.params;
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        res.status(401).json({ error: 'Unauthorized' });
    } else {
        const quiz = await prisma.quiz.findUnique({
            where: { id: parseInt(id), adminId: parseInt(decoded.adminId) }
        });
        if (!quiz) {
            res.status(404).json({ error: 'Quiz not found' });
        } else {
            const questions = await prisma.question.findMany({
                where: { quizId: parseInt(id), adminId: parseInt(decoded.adminId) }
            });
            res.json({ quiz, questions });
        }
    }
});

app.get('/inactive', async (req, res) => {
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        res.status(401).json({ error: 'Unauthorized' });
    } else {
        const quizzes = await prisma.quiz.findMany({
            where: { active: false, adminId: parseInt(decoded.adminId) }
        });
        res.json(quizzes);
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
            where: { active: true, adminId: parseInt(decoded.adminId) }
        });
        res.json(quizzes);
    }
});

app.post('/publish/:id', async (req, res) => {
    const { id } = req.params;
    const { code } = req.body;
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        res.status(401).json({ error: 'Unauthorized' });
    } else {
        const quiz = await prisma.quiz.update({
            where: { id: parseInt(id), adminId: parseInt(decoded.adminId) },
            data: { active: true, code: code }
        });
        res.json(quiz);
    }
});

app.post('/stoppublish/:id', async (req, res) => {
    const { id } = req.params;
    const token = req.headers.token;
    console.log(token)
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        res.status(401).json({ error: 'Unauthorized' });
    } else {
        const quiz = await prisma.quiz.update({
            where: { id: parseInt(id), adminId: parseInt(decoded.adminId) },
            data: { active: false }
        });
        res.json(quiz);
    }
});

module.exports = {
    quizRoutes: app
}