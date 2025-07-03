import axios from "axios";
import { useNavigate } from "react-router";

function Signin() {
    const navigate = useNavigate();
    const handleSignin = (e) => {
        e.preventDefault();
        console.log("Signin");
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        axios.post("http://localhost:3000/signin", { username, password })
            .then((res) => {
                console.log(res.data.message);
                if(res.status === 406){
                    alert("User not found");
                    return;
                }
                else if(res.status === 200){
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("username", username);
                    console.log(localStorage.getItem("token"));
                    console.log(localStorage.getItem("username"));
                    navigate("/dashboard");
                }
                else if(res.status === 401){
                    alert("Invalid username or password");
                }
                else{
                    alert("Error");
                }
            })
            .catch((err) => {
                console.log("Signin failed", err);
            })
    }
    return (
        <div className="signup-container">
            <h1>Sign In</h1>
            <form onSubmit={handleSignin}>
                <input type="text" placeholder="Username" id="username" /><br></br>
                <input type="password" placeholder="Password" id="password" /><br></br>
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}

export default Signin;
