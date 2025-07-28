import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

function StartQuiz() {
    const { quizId } = useParams();
    const [title, setTitle] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [liveQuizQuestion, setLiveQuizQuestion] = useState("");
    const [liveQuizOptions, setLiveQuizOptions] = useState([]);
    const [ws, setWs] = useState(null);
    const handleStartQuiz = async () => {
        const ws = new WebSocket(`ws://localhost:3000/quiz/${quizId}`);
        setWs(ws);
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            if (data.type === "start") {
                setLiveQuizQuestion(data.liveQuiz.title);
                setLiveQuizOptions(data.liveQuiz.options);
            }
            if (data.type === "next") {
                setLiveQuizQuestion(data.liveQuiz.title);
                setLiveQuizOptions(data.liveQuiz.options);
            }
            if (data.type === "end") {
                setLiveQuizQuestion("");
                setLiveQuizOptions([]);
            }
        }
        ws.onopen = () => {
            console.log("WebSocket connected");
            ws.send(JSON.stringify({
                type: "start",
                quizId: quizId,
                token: localStorage.getItem("token")
            }));
        }
        ws.onclose = () => {
            console.log("WebSocket closed");
        }
    }
    const handleNextQuestion = () => {
        ws.send(JSON.stringify({
            type: "next",
            quizId: quizId,
            token: localStorage.getItem("token")
        }));

    }
    const handleGetQuiz = async () => {
        const response = await axios.get(`http://localhost:3000/quiz/admin/${quizId}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
        console.log(response.data);
        setTitle(response.data.title);
        setQuestions(response.data.questions);
    }
    useEffect(() => {
        handleGetQuiz();
    }, []);
    return (
        <div>
            <h1>Start Quiz {quizId}</h1>
            <h2>{title}</h2>
            <button onClick={handleStartQuiz}>Start Quiz</button>
            <b><p>Question: {liveQuizQuestion}</p></b>
            Options: {liveQuizOptions.map((option, index) => (
                <p key={index}>{index + 1}. {option.title}</p>
            ))}
            <button onClick={handleNextQuestion} disabled={liveQuizQuestion === ""}>Next Question</button>
            <div id="questions">
                {questions.map((question, index) => (
                    <div key={index}>
                        <p>Question {index + 1}:
                            {question.title} <span>Option 1: {question.option1} Option 2: {question.option2} Option 3: {question.option3} Option 4: {question.option4} Answer: {question.answer}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default StartQuiz;