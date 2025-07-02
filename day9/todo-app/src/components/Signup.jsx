//import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function Signup() {
    const navigate = useNavigate();
    function signup() {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        axios.post("http://localhost:3000/signup", { username, password })
            .then(res => {
                console.log(res.data.message);
                if(res.status === 406){ 
                    //alert("User already exists");
                    return;
                }
                else if(res.status === 201){
                    navigate("/signin");
                    //alert("User created successfully");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div>
            <h1>Sign Up</h1>
            <input id="username" type="text" placeholder="Username" /><br></br>
            <input id="password" type="password" placeholder="Password" /><br></br>
            <button onClick={signup}>Sign Up</button>
        </div>
    )
}

export default Signup;