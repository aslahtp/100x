const express = require("express")
const jwt=require("jsonwebtoken")

const app=express()

app.use(express.json())
app.use(logTime)

let users=[{
    username:"admin",
    password:"123456",
    name:"Admin",
    todos:["todo1","todo2","todo3"]
}];

function authMiddleware(req,res,next){
    let token=req.headers.token;
    let decoded=jwt.verify(token,"secretkey");
    if(decoded){
        req.username=decoded.username;
        next();
    }else{
        res.status(401).json({message:"Unauthorized"});
    }
}



let requestcount=0;

app.post("/signup",(req,res)=>{
    incrementRequestCount();
    let username=req.body.username;
    let password=req.body.password;
    let name=req.body.name;
    let user={
        username:username,
        password:password,
        name:name
    }
    users.push(user);
    res.send("user created successfully");
    console.log(users);
})

app.post("/signin",(req,res)=>{ 
    requestcount++;
    let username=req.body.username;
    let password=req.body.password;
    let user=users.find(user=>user.username===username && user.password===password);
    if(user){
        let token=jwt.sign({username:username},"secretkey");
        res.json({message:"user signed in successfully",token:token});
        console.log(token);
    }else{
        res.send("user not found");
    }
})

app.get("/gettodos",authMiddleware,(req,res)=>{
    requestcount++;
    let user=users.find(user=>user.username===req.username);
    if(user){
        res.send({todos:user.todos});
    }else{
        res.status(403).json({message:"Unauthorized"});
    }
})

app.post("/addtodo",authMiddleware,(req,res)=>{
    requestcount++;
    let user=users.find(user=>user.username===req.username);
    if(user){
        user.todos.push(req.body.todo);
        res.json({message:"Todo added successfully",todos:user.todos});
    }else{
        res.status(403).json({message:"Unauthorized"});
    }
})

function incrementRequestCount(req,res,next){
    requestcount++;
    next();
}

function logTime(req,res,next){
    let startTime=Date.now()
    next();
    let endTime=Date.now();
    let duration=endTime-startTime;
    console.log(`Request duration: ${duration}ms for ${req.method} ${req.url}`);
}

app.get("/count",incrementRequestCount,(req,res)=>{
    
    let num=req.query.num;
    let count=0;
    for(let i=1;i<=num;i++){
        count+=i;
    }
    res.send(count);
})

app.get("/requestcount",(req,res)=>{
    requestcount++;
    res.json({requestcount:requestcount});
})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})