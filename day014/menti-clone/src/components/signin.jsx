import axios from 'axios'
import { useNavigate } from 'react-router'
function Signin() {
    const navigate = useNavigate()
    const handleSignin = async () => {
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        const isAdmin = document.getElementById('switch-component-on').checked
        if (isAdmin === true) {
            const response = await axios.post('http://localhost:3000/auth/adminsignin', {
                username,
                password
            })
            console.log(response)
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('isAdmin', true)
                localStorage.setItem('username', username)
                navigate('/dashboard')
            }
        } else {
            const response = await axios.post('http://localhost:3000/auth/signin', {
                username,
                password
            })
            console.log(response)
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('isAdmin', false)
                localStorage.setItem('username', username)
                navigate('/dashboard')
            }
        }
    }
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <div className="flex flex-col w-1/2 h-auto justify-center items-center bg-gray-100 gap-4 border-2 border-gray-500 rounded-md p-4">
                <h1 className="text-4xl font-bold underline">Sign In</h1>
                <div className="flex flex-col items-center justify-center">
                    <div className="inline-flex items-center gap-2">

                        <label htmlFor="switch-component-on" className="text-slate-600 text-sm cursor-pointer">User</label>
                        <div className="relative inline-block w-11 h-5">
                            <input id="switch-component-on" type="checkbox" className="peer appearance-none w-11 h-5 bg-slate-300 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300" />
                            <label htmlFor="switch-component-on" className="absolute top-0 left-0 w-5 h-5 bg-gray-300 rounded-full border border-slate-500 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer">
                            </label>
                        </div>
                        <label htmlFor="switch-component-on" className="text-slate-600 text-sm cursor-pointer">Admin</label>

                    </div><br></br>
                    <input type="text" id="username" placeholder="Username" className="border-2 border-gray-300 rounded-md p-2" /><br></br>
                    <input type="password" id="password" placeholder="Password" className="border-2 border-gray-300 rounded-md p-2" /><br></br>
                    <button type="submit" className="bg-blue-500 text-white rounded-md p-2" onClick={() => handleSignin()}>Signin</button>
                </div>
            </div>
        </div>
    )
}

export default Signin