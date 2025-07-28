import { useNavigate } from 'react-router'

function Home() {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100 gap-4">
            <h1 className="text-4xl font-bold">Home</h1>
            <button onClick={() => navigate('/signin')} className="bg-blue-500 text-white rounded-md p-2">Sign In</button>
            <button onClick={() => navigate('/signup')} className="bg-blue-500 text-white rounded-md p-2">Sign Up</button>
        </div>
    )
}

export default Home
