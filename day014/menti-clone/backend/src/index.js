const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const { authRoutes } = require('./services/auth');
const { quizRoutes } = require('./routes/quiz');
const { questionRoutes } = require('./routes/question');
const { submissionRoutes } = require('./routes/submission');


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