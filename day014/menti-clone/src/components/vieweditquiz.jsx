import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'

function ViewEditQuiz() {
    const { id } = useParams()
    const [questions, setQuestions] = useState([])
    const [title, setTitle] = useState('')
    const handleQuiz = async () => {

        const response = await axios.get(`http://localhost:3000/quiz/id/${id}`, {
            headers: {
                'token': localStorage.getItem('token')
            }
        })
        console.log(response.data)
        setTitle(response.data.quiz.title)

    }
    const handleQuestions = async () => {
        const response = await axios.get(`http://localhost:3000/question?quizId=${id}`, {
            headers: {
                'token': localStorage.getItem('token')
            }
        })
        console.log(response.data)
        setQuestions(response.data)
    }
    const handleDeleteQuestion = async (questionId) => {
        const response = await axios.delete(`http://localhost:3000/question/${questionId}`, {
            headers: {
                'token': localStorage.getItem('token')
            }
        })
        console.log(response.data)
        handleQuestions()
    }
    const handleAddQuestion = async () => {
        const question = document.getElementById('question').value
        const options = [document.getElementById('option1').value,
        document.getElementById('option2').value,
        document.getElementById('option3').value,
        document.getElementById('option4').value]
        const answer = document.getElementById('answer').value
        console.log(question, options, answer)
        const response = await axios.post(`http://localhost:3000/question`, {
            question: question,
            options: options,
            answer: answer,
            quizId: id
        }, {
            headers: {
                'token': localStorage.getItem('token')
            }
        })
        console.log(response.data)
        handleQuestions()
    }
    useEffect(() => {
        handleQuiz()
        handleQuestions()
    }, [])
    return (
        <div className='flex justify-center '>
            <div className='flex flex-row items-start justify-center w-3/4 bg-gray-100'>
                <div className='flex flex-col items-center justify-center w-full'>
                    <h1 className='text-4xl font-bold'>View/Edit Quiz</h1>
                    <h2 className='text-3xl font-bold text-center border-2 border-gray-300 rounded-md p-2 m-2 w-full'>{title}</h2>
                    <div className='flex flex-col items-center justify-center w-full'>
                        <h3 className='text-1.5xl font-bold underline'>Questions</h3>
                        <div className='flex flex-col items-center justify-center w-full border-2 border-gray-300 rounded-md p-2 m-2 '>
                            <div className='flex flex-col items-center justify-center w-full border-2 border-gray-300 rounded-md p-2 m-2'>
                                <input type="text" id='question' placeholder='Question' className='border-2 border-gray-300 rounded-md p-2 m-2 w-full' />
                                <div className='flex'>
                                    <input type="text" id='option1' placeholder='Option 1' className='border-2 border-gray-300 rounded-md p-2 m-2 w-full' />
                                    <input type="text" id='option2' placeholder='Option 2' className='border-2 border-gray-300 rounded-md p-2 m-2 w-full' />
                                    <input type="text" id='option3' placeholder='Option 3' className='border-2 border-gray-300 rounded-md p-2 m-2 w-full' />
                                    <input type="text" id='option4' placeholder='Option 4' className='border-2 border-gray-300 rounded-md p-2 m-2 w-full' />
                                </div>
                                <div>
                                    <label className=''> Answer</label>
                                    <select id="answer" placeholder='Answer' className='border-2 border-gray-300 rounded-md p-2 m-2 w-auto'>
                                        <option value="1">Option 1</option>
                                        <option value="2">Option 2</option>
                                        <option value="3">Option 3</option>
                                        <option value="4">Option 4</option>
                                    </select>
                                </div>
                                <button className='bg-blue-300 text-white p-2 rounded-md hover:bg-blue-500 m-4 h-10 w-15' onClick={() => {
                                    handleAddQuestion()
                                }}>Add</button>
                            </div>
                            <div className='flex flex-col items-center justify-center w-full border-2 border-gray-300 rounded-md p-2 m-2'>
                                {questions.map((question) => (
                                    <div key={question.id} className='flex flex-col items-center justify-center w-full border-2 border-gray-300 rounded-md p-2 m-2'>
                                        <div className='flex flex-row items-center justify-around w-full border-1 border-gray-300 rounded-md p-2 m-2'>
                                            <h3 className='text-1xl font-bold'>{question.question}</h3>
                                            <button className='bg-red-300 text-white text-2sl p-2 rounded-md hover:bg-red-500 m-4 h-10 w-15' onClick={() => {
                                                handleDeleteQuestion(question.id)
                                            }}>Delete</button>

                                        </div>
                                        <h3 className='text-1xl font-bold m-2'>Options</h3>
                                        <div className='flex flex-row items-center justify-center w-full'>
                                            <label className='text-1xl font-bold m-2 border-1 border-gray-300 rounded-md w-1/5 p-2'>{question.option1}</label>
                                            <label className='text-1xl font-bold m-2 border-1 border-gray-300 rounded-md w-1/5 p-2'>{question.option2}</label>
                                            <label className='text-1xl font-bold m-2 border-1 border-gray-300 rounded-md w-1/5 p-2'>{question.option3}</label>
                                            <label className='text-1xl font-bold m-2 border-1 border-gray-300 rounded-md w-1/5 p-2'>{question.option4}</label>
                                        </div>
                                    </div>


                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewEditQuiz;