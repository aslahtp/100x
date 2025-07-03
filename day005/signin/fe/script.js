function signUp(event) {
    if (event) event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    console.log(username, password);
    axios.post("http://localhost:3000/signUp", {
        username: username,
        password: password
    }).then((response) => {
        console.log(response.data);
        
    });
}

function signIn(event) {
    if (event) event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    console.log(username, password);
    axios.post("http://localhost:3000/signIn", {
        username: username,
        password: password
    }).then((response) => {
        console.log(response.data);
        if (response.data=="Invalid username or password") {
            document.getElementById("messageHome").innerHTML="Invalid username or password";
            return;
        }
        else {
            localStorage.setItem("username", username);
            localStorage.setItem("activeToken", response.data);
            document.getElementById("messageHome").innerHTML="Current user is "+username;
            window.location.href = "todo.html";
        }
    });
    
    
}

function checkLoginHome() {
    let username = localStorage.getItem("username");
    let activeToken = localStorage.getItem("activeToken");
    axios.get("http://localhost:3000/checkLogin?username="+username+"&activeToken="+activeToken).then((response) => {
        console.log(response.data);
        if (response.data=="Invalid") {
            console.log("Invalid username or activeToken in Local Storage");
            //document.getElementById("messageHome").innerHTML="Invalid username or activeToken in Local Storage";
            return;
        }
        else {
            window.location.href = "todo.html";
        }
    });
}

function checkLoginTodo() {
    let username = localStorage.getItem("username");
    let activeToken = localStorage.getItem("activeToken");
    if (username && activeToken) {
        document.getElementById("message").innerHTML="Current user is "+username;
    }
    else {
        window.location.href = "index.html";
    }
}