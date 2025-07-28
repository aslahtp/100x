const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.post('/', async (req, res) => {
    const { question, options, answer,  quizId } = req.body;
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        res.status(401).json({ error: 'Unauthorized' });
    } else {
        console.log(decoded)
        const quiz = await prisma.quiz.findUnique({
            where: { id: parseInt(quizId) }
        });
        if (!quiz) {
            res.status(404).json({ error: 'Quiz not found' });
        } else {
            const option1 = options[0]
            const option2 = options[1]
            const option3 = options[2]
            const option4 = options[3]
            const q = await prisma.question.create({
                data: { question, option1, option2, option3, option4, answer: parseInt(answer), quizId: parseInt(quizId), adminId: parseInt(decoded.adminId) }
            });
            res.json(q);
        }
    }
});

app.get('/', async (req, res) => {
    const token = req.headers.token;
    const quizId = req.query.quizId;
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    const questions = await prisma.question.findMany({
        where: { quizId: parseInt(quizId) }
    });
    res.json(questions);
});

app.delete('/:questionId', async (req, res) => {
    const questionId = req.params.questionId;
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    const question = await prisma.question.delete({
        where: { id: parseInt(questionId) }
    });
    res.json({ message: "Question deleted successfully" + questionId });
});

module.exports = {
    questionRoutes: app
}