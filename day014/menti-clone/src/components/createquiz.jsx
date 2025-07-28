import axios from 'axios'
import { useNavigate } from 'react-router'
function CreateQuiz() {
    const navigate = useNavigate()
    const handleCreateQuiz = async () => {
        const title = document.getElementById('title').value
        const response = await axios.post('http://localhost:3000/quiz', {
            title
        }, {
            headers: {
                'token': localStorage.getItem('token')
            }
        })
        if (response.status === 200) {
            navigate('/dashboard')
        }
        else {
            alert('Failed to create quiz')
        }
    }
    return (
        <div className='flex justify-center h-screen'>
            <div className='flex flex-row items-start justify-center h-screen w-3/4 bg-gray-100'>
                <div className='flex flex-col items-center justify-center w-full'>
                    <h1 className='text-4xl font-bold'>Create Quiz</h1>
                    <input type="text" placeholder="Title" className='border-2 border-gray-300 rounded-md p-2 m-2' id='title' />
                    <button className='bg-blue-300 text-white p-2 rounded-md hover:bg-blue-500 m-4 h-10 w-40' onClick={handleCreateQuiz}>Create Quiz</button>
                </div>
            </div>
        </div>
    )
}

export default CreateQuiz;