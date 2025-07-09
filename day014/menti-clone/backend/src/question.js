const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.post('/', async (req, res) => {
    const { question, option1, option2, option3, option4, answer, quizId, adminId } = req.body;
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        res.status(401).json({ error: 'Unauthorized' });
    } else {
        const quiz = await prisma.quiz.findUnique({
            where: { id: quizId }
        });
        if (!quiz) {
            res.status(404).json({ error: 'Quiz not found' });
        } else {
            const q = await prisma.question.create({
                data: { question, option1, option2, option3, option4, answer, quizId, adminId }
            });
            res.json(q);
        }
    }
});

module.exports = {
    questionRoutes: app
}