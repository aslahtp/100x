const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

let users=[{
    userId:1,
    name:"Admin",
    username:"admin",
    password:"123456"
},
{
    userId:2,
    name:"User",
    username:"user",
    password:"123456"
}]

let blogs=[
    {
        id:1,
        userId:1,
        title:"Blog 1",
        content:"Content 1",
    },
    {
        id:2,
        userId:2,
        title:"Blog 2",
        content:"Content 2",
    },
    {
        id:3,
        userId:1,
        title:"Blog 3",
        content:"Content 3",
    }
]

app.post("/addblog", (req, res) => {
    let {title, content} = req.body;
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, "123random");
    let user = users.find(user => user.userId === decoded.userId && user.username === decoded.username);
    if(user) {
        blogs.push({id:blogs.length + 1, userId:user.userId, title, content});
        res.status(200).json({message:"Blog added successfully"});
        
        console.log(blogs);
    } else {
        res.status(400).json({message:"User not found"});
    }
});

app.post("/signin", (req, res) => {
    let {username, password} = req.body;
    let user = users.find(user => user.username === username && user.password === password);
    if(user) {
        let token = jwt.sign({userId:user.userId, username:user.username}, "123random");
        res.status(200).json({message:"User signed in successfully", token:token});
    } else {
        res.status(400).json({message:"User not found"});
    }
});

app.post("/signup", (req, res) => {
    let {name, username, password} = req.body;
    users.push({userId:users.length + 1, name, username, password});
    res.status(200).json({message:"User created successfully"});
    console.log(users);
});

app.get("/viewblogpage", (req, res) => {
    let blogid = req.query.blogid;
    console.log(blogid);
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, "123random");
    let user = users.find(user => user.userId === decoded.userId && user.username === decoded.username);
    if(user) {
        console.log(user);
        let blog = blogs.find(blog => blog.id === parseInt(blogid));
        console.log(blog);
        res.status(200).json(blog);
    } else {
        res.status(400).json({message:"User not found"});
    }
});

app.get("/viewallblogs", (req, res) => {
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, "123random");
    let user = users.find(user => user.userId === decoded.userId && user.username === decoded.username);
    if(user) {
        console.log(blogs.filter(blog => blog.userId === user.userId));
        let blogsOfUser= blogs.filter(blog => blog.userId === user.userId).map((blog)=>{return {id:blog.id,title:blog.title}});
        console.log(blogsOfUser);
        res.status(200).json({blogsOfUser, name:user.name});
        // console.log({id:blogsOfUser.map(blog => blog.id), title:blogsOfUser.map(blog => blog.title)});
    } else {
        res.status(400).json({message:"User not found"});
    }
});

app.get("/viewblogidpage", (req, res) => {
    res.sendFile(__dirname + "/viewbyid.html");
});

app.get("/viewblogs", (req, res) => {
  res.sendFile(__dirname + "/viewblogs.html");
});

app.get("/signin", (req, res) => {
    res.sendFile(__dirname + "/signin.html");
});
app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
