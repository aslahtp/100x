const jwt = require("jsonwebtoken");
const express = require("express");

const app = express();
app.use(express.json());

data = [
  {
    name: "aslah",
    password:"123456",
    todos:[
        {
            title:"todo1",
        },
        {
            title:"todo2",
        }
    ]
  },
  {
    name:"admin",
    password:"123456",
    todos:[
        {
            title:"todo admin 1",
        },
        {
            title:"todo admin 2",
        }
    ]
  },
];

/*let token = jwt.sign("{name:aslah}", "123random");
console.log(token);

let decoded = jwt.verify(token, "123random");
console.log(decoded);*/

app.get("/todos", (req, res) => {
  let { token } = req.body;
  let username = jwt.verify(token, "123random").name;
  let user = data.find((user) => user.name === username);
  if (user) {
    res.json({todos:user.todos});
  } else {
    res.json({message:"User not found", token:token});
  }
});

app.post("/addtodo", (req, res) => {
  let { token, todo } = req.body;
  let username = jwt.verify(token, "123random").name;
  let user = data.find((user) => user.name === username);
  console.log(user);
  if (user) {
    user.todos.push({ title: todo });
    res.json({message:"Todo added successfully"});
  } else {
    res.json({message:"User not found"});
  }
}); 

app.post("/signup", (req, res) => {
  let { name, password } = req.body;
  let user = data.find((user) => user.name === name);
  if (user) {
    res.status(400).send("User already exists");
  } else {
    data.push({ name:name, password:password, todos: [] });
    res.json({message:"User created successfully"});
  }
});

app.post("/signin", (req, res) => {
  let { name, password } = req.body;
  let user = data.find((user) => user.name === name && user.password === password);
  if (user) {
    let token = jwt.sign({ name: name }, "123random");
    res.json({token:token});
  } else {
    res.json({message:"User not found"});
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});