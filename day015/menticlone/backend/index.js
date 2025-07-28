const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const authRoutes = require("./src/auth");
const quizRoutes = require("./src/quiz");
const resultRoutes = require("./src/result");
const cors = require("cors");
const { WebSocketServer } = require("ws");
const { PrismaClient } = require("@prisma/client");

dotenv.config();


const app = express();
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
const wss = new WebSocketServer({ server });
const prisma = new PrismaClient();

let liveQuiz = [];

wss.on("connection", (ws) => {
    console.log("Client connected");
    ws.on("message", async (message) => {



        const data = JSON.parse(message);

        if (data.type === "next") {
            liveQuiz.shift();

                ws.send(JSON.stringify({
                    type: "next",
                liveQuiz: liveQuiz[0][0]
            }));
        }
        if (data.type === "start") {
            const quizId = data.quizId;
            const token = data.token;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) {
                ws.send(JSON.stringify({
                    type: "error",
                    message: "Unauthorized"
                }));
            }
            const quiz = await prisma.quiz.findUnique({
                where: {
                    id: parseInt(quizId),
                    adminId: decoded.id
                },
                include: {
                    questions: {
                        include: {
                            options: true
                        }
                    }
                }
            });
            if (!quiz) {
                ws.send(JSON.stringify({
                    type: "error",
                    message: "Quiz not found"
                }));
            }
            else {
                liveQuiz.push(quiz.questions);
                console.log(liveQuiz[0][0]);
                ws.send(JSON.stringify({
                    type: "start",
                    liveQuiz: liveQuiz[0][0]
                }));
            }

            ws.on("close", () => {
                console.log("Client disconnected");
            });
        }
    });
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/", authRoutes);
app.use("/quiz", quizRoutes);
app.use("/result", resultRoutes);