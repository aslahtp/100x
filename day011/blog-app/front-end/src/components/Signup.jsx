import axios from "axios";
import { useNavigate } from "react-router";

function Signup() {
    const navigate = useNavigate();
    const handleSignup = (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        console.log(username, password);
        axios.post("http://localhost:3000/signup", {
            username: username,
            password: password,
        })
            .then((res) => {
                console.log(res.data.message);
                if (res.status === 201) {
                    navigate("/signin");
                } else {
                    alert("Error");
                }
            })
            .catch((err) => {
                console.log("Signup failed", err);
            })
    }
    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <input type="text" placeholder="Username" id="username" /><br></br>
                <input type="password" placeholder="Password" id="password" /><br></br>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup;
