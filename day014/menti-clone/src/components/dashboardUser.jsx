import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
function DashboardUser() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    useEffect(() => {
        const username = localStorage.getItem('username')
        setUsername(username)
    }, [])
    return (
        <div className='flex justify-center h-screen'>
            <div className='flex flex-row items-start justify-center h-screen w-1/2 bg-gray-100'>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-4xl font-bold'>Dashboard user</h1>
                    <label className='text-1.5xl font-italic'>Welcome {username}</label>
                    <button className='bg-red-300 text-white p-2 rounded-md hover:bg-red-500 m-4 h-10 w-20' onClick={() => {
                        localStorage.removeItem('token')
                        localStorage.removeItem('isAdmin')
                        localStorage.removeItem('username')
                        navigate('/')
                    }}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default DashboardUser;