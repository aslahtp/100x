import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
function DashboardAdmin() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [inactiveQuizs, setInactiveQuizs] = useState([])
    const handleQuizs = async () => {
        // const response = await axios.get('http://localhost:3000/quiz/active', {
        //     headers: {
        //         'token': localStorage.getItem('token')
        //     }
        // })
        // console.log(response.data)
        // setQuizs(response.data)
        const responseInactive = await axios.get('http://localhost:3000/quiz/inactive', {
            headers: {
                'token': localStorage.getItem('token')
            }
        })
        console.log(responseInactive.data)
        setInactiveQuizs(responseInactive.data)
    }
    const handleDelete = async (id) => {
        const response = await axios.delete(`http://localhost:3000/quiz?id=${id}`, {
            headers: {
                'token': localStorage.getItem('token')
            }
        })
        console.log(response.data)
        handleQuizs()
    }
    // const handlePublish = async (id) => {
    //     const response = await axios.post(`http://localhost:3000/quiz/publish/${id}`, {
    //         code: Math.random().toString().substring(2, 10)
    //     }, {
    //         headers: {
    //             'token': localStorage.getItem('token')
    //         }
    //     })
    //     console.log(response.data)
    //     handleQuizs()
    // }
    // const handleStopPublish = async (id) => {
    //     const response = await axios.post(`http://localhost:3000/quiz/stoppublish/${id}`, {}, {
    //         headers: {
    //             'token': localStorage.getItem('token')
    //         }
    //     })
    //     console.log(response.data)
    //     handleQuizs()
    // }
    useEffect(() => {
        const username = localStorage.getItem('username')
        setUsername(username)
        handleQuizs()
    }, [])
    return (
        <div className='flex justify-center '>
            <div className='flex flex-row items-start justify-center  w-3/4 bg-gray-100'>
                <div className='flex flex-col items-center justify-center w-full'>
                    <h1 className='text-4xl font-bold'>Dashboard admin</h1>
                    <label className='text-1.5xl font-italic'>Welcome {username}</label>
                    <button className='bg-red-300 text-white p-2 rounded-md hover:bg-red-500 m-4 h-10 w-20' onClick={() => {
                        localStorage.removeItem('token')
                        localStorage.removeItem('isAdmin')
                        localStorage.removeItem('username')
                        navigate('/')
                    }}>Logout</button>
                    <div className='flex flex-col items-center justify-center border-2 border-gray-300 rounded-md p-4 m-4 w-3/4'>
                        <h2 className='text-2xl font-bold underline'>Quizs</h2><br />
                        <hr className='w-full border-1 border-gray-300'></hr>
                        <button className='bg-blue-300 text-white p-2 rounded-md hover:bg-blue-500 m-4 h-10 w-40' onClick={() => {
                            navigate('/createquiz')
                        }}>Create Quiz</button>

                        

                        <div className='flex flex-col items-center justify-center w-full'>
                            <h3 className='text-1xl font-bold underline'>Inactive Quizs</h3>
                            <div className='flex flex-col items-center justify-center w-full'>
                                <div className='flex flex-col items-center justify-center w-full'>
                                    {inactiveQuizs.map((quiz) => (
                                        <div key={quiz.id} className='flex flex-row items-center justify-between border-2 border-gray-300 rounded-md p-4 m-2 w-3/4 '>
                                            <label className='text-1xl font-bold'>{quiz.title}</label>
                                            <div className='flex flex-row items-center justify-center'>
                                                <button className='bg-violet-300 text-white p-2 rounded-md hover:bg-violet-500 m-4 h-10 w-auto' onClick={() => {
                                                    navigate(`/publishquiz/${quiz.id}`)
                                                }}>Publish</button>
                                                <button className='bg-green-300 text-white p-2 rounded-md hover:bg-green-500 m-4 h-10 w-auto' onClick={() => {
                                                    navigate(`/quiz/${quiz.id}`)
                                                }}>View/Edit</button>
                                                <button className='bg-red-300 text-white p-2 rounded-md hover:bg-red-500 m-4 h-10 w-auto' onClick={() => {
                                                    handleDelete(quiz.id)
                                                }}>Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DashboardAdmin;