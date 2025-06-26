const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

let data = [
  {
    username: "admin",
    password: "123456",
    activeToken: null,
    allCompleted:false,
    todos:[{
        todo:"Todo admin 1",
        completed:false,
    },
    {
        todo:"Todo admin 2",
        completed:false,
    }],
  },
  {
    username: "user",
    password: "12345",
    activeToken: null,
    allCompleted:false,
    todos:[{
        todo:"Todo user 1",
        completed:false,
    },
    {
        todo:"Todo user 2",
        completed:false,
    }],
  },
];

app.post("/update-todo", (req, res) => {
  let activeToken = req.body.activeToken;
  //let allCompleted = req.body.allCompleted;
  let todoText = req.body.todo;
  let user = data.find((user) => user.activeToken === activeToken);
  //console.log(user.todos);

  if (user) {
    //user.allCompleted = allCompleted;
    //user.todos = todos;
    user.todos.push({todo:todoText,completed:false});
    console.log(user.todos);
    res.json("Todo updated successfully from be");
  }
});

app.get("/signin", (req, res) => {
  res.sendFile(__dirname + "/src/signin.html");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/src/signup.html");
});

app.get("/dashboard", (req, res) => {
  res.sendFile(__dirname + "/src/dashboard.html");
});

app.get("/get-todos", (req, res) => {
  let activeToken = req.query.activeToken;
  let user = data.find((user) => user.activeToken === activeToken);
  if (user) {
    res.json(user.todos);
    console.log(user.todos);
  } else {
    res.json("Invalid active token");
  }
});

app.get("/checkLogin", (req, res) => {
  let username = req.query.username;
  let activeToken = req.query.activeToken;
  let user = data.find(
    (user) => user.username === username && user.activeToken === activeToken
  );
  if (user) {
    res.json("Valid");
  } else {
    res.json("Invalid");
  }
});
app.post("/signIn", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let user = data.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    if (user.activeToken == null) {
      console.log(data);
      let token = Math.random().toString(36).slice(2, 15);
      user.activeToken = token;
      res.json(token);
    } else {
      res.json(user.activeToken);
    }
  } else {
    res.json("Invalid username or password");
  }
});

app.post("/signUp", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (data.find((user) => user.username === username)) {
    res.json("User already exists");
    return;
  }
  console.log(username, password);
  //token=Math.random().toString().slice(2,15);
  data.push({
    username: username,
    password: password,
    activeToken: null,
    allCompleted:false,
    todos:[],
  });
  console.log(data);
  res.json("User created successfully");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
