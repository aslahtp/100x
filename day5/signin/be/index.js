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
  },
  {
    username: "user2",
    password: "12345654",
    activeToken: null,
  },
];

app.get("/checkLogin", (req, res) => {
  let username = req.query.username;
  let activeToken = req.query.activeToken;
  let user = data.find((user) => user.username === username && user.activeToken === activeToken);
  if (user) {
    res.json("Valid");
  } else {
    res.json("Invalid");
  }
});
app.post("/signIn", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let user = data.find((user) => user.username === username && user.password === password);
  if (user) {
    if (user.activeToken==null) {
        console.log(data);
      let token=Math.random().toString().slice(2,15);
      user.activeToken=token;
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
  });
  console.log(data);
  res.json("User created successfully");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
