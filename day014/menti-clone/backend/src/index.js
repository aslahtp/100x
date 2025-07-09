const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const { authRoutes } = require('./auth');
const { quizRoutes } = require('./quiz');
const { questionRoutes } = require('./question');
const { submissionRoutes } = require('./submission');

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/auth', authRoutes);
app.use('/quiz', quizRoutes);
app.use('/question', questionRoutes);
app.use('/submission', submissionRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});