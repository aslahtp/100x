import { useParams } from 'react-router'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
function PublishQuiz() {
    const { id } = useParams()
    const [code, setCode] = useState('')
    const [quiz, setQuiz] = useState({})
    const [questions, setQuestions] = useState([])
    const handlePublish = async () => {
        const response = await axios.post(`http://localhost:3000/quiz/publish/${id}`, { code }, {
            headers: {
                'token': localStorage.getItem('token')
            }
        })
        console.log(response.data)
        setQuiz(response.data)
    }
    const handleGetQuiz = async () => {
        const response = await axios.get(`http://localhost:3000/quiz/id/${id}`, {
            headers: {
                'token': localStorage.getItem('token')
            }
        })
        console.log(response.data)
        setQuiz(response.data.quiz)
        setQuestions(response.data.questions)
    }
    useEffect(() => {
        handleGetQuiz()
    }, [])
    return (
        <>

            <div className='flex flex-col items-center justify-center w-full bg-blue-50'>
                <h1 className='text-2xl font-bold'>Publish Quiz: {quiz.title || ''}</h1>
                <h1 className='text-2xl font-bold'>Questions</h1>
                <div className='flex flex-col items-center justify-center w-full'>
                    {questions.map((question) => (
                        <div key={question.id} className='flex flex-col items-center justify-center w-full border-2 border-gray-300 rounded-md p-2 m-2'>
                            <h3 className='text-1xl font-bold'>{question.question}</h3>
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
            <div className='flex flex-col items-center justify-center w-full bg-gray-100'>
                <h1 className='text-2xl font-bold'>Publish Quiz: {quiz.title || ''} {quiz.code || ''}</h1>
                <input type='text' value={code} onChange={(e) => setCode(e.target.value)} />
                <button className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 m-4 h-10 w-auto' onClick={handlePublish}>Publish</button>
            </div>
        </>
    )
}

export default PublishQuiz;