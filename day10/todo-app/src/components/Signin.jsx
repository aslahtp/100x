//import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function Signin() {
    const navigate = useNavigate();
    function signin() {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        axios.post("http://localhost:3000/signin", { username, password })
            .then(res => {
                console.log(res.data.message);
                if(res.status === 406){ 
                    //alert("Error");
                    return;
                }
                else if(res.status === 200){
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("username", username);
                    console.log(localStorage.getItem("token"));
                    console.log(localStorage.getItem("username"));
                    navigate("/dashboard");
                    //alert("Signin successful");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div>
            <h1>Sign In</h1>
            <input id="username" type="text" placeholder="Username" /><br></br>
            <input id="password" type="password" placeholder="Password" /><br></br>
            <button onClick={signin}>Sign In</button>
        </div>
    )
}

export default Signin;