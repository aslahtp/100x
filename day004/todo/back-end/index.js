const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let data = [];

app.get("/todo-list", (req, res) => {
    res.json(data);
});

app.post("/update-todo", (req, res) => {
    data.push(req.body.todo);
    res.json(data);
});

app.post("/delete-todo", (req, res) => {
    
    let d1=req.body.todo;
    console.log(d1);
    data = data.filter(todo => todo !== d1);
    res.json(data);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
