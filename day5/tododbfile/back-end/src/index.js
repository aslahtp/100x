const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const todoFilePath = path.join(__dirname, "../todo.json");

app.get("/todos", (req, res) => {
    fs.readFile(todoFilePath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read todo list" });
        } else {
            res.json(JSON.parse(data));
            console.log(JSON.parse(data).todo);
        }
    });
});

app.post("/todos", (req, res) => {
    const { id, title, completed } = req.body;
    const newTodo = { id, title, completed };
    
    // Read existing todos first
    fs.readFile(todoFilePath, "utf-8", (err, data) => {

            const todoData = JSON.parse(data);
            todoData.todo.push(newTodo);
            
            // Write the updated data back to file
            fs.writeFile(todoFilePath, JSON.stringify(todoData,null,2), (writeErr) => {
                if (writeErr) {
                    return res.status(500).json({ error: "Failed to add todo" });
                }
                res.json({ message: 'Todo added successfully', todo: newTodo });
            });
    });
});

app.get("/todos/:id",(req,res)=>{
    const {id}=req.params;
    fs.readFile(todoFilePath,"utf-8",(err,data)=>{
        const todoData=JSON.parse(data);
        const todo=todoData.todo.find(todo=>todo.id==id);
        console.log(todo,typeof todo);
        res.json(todo);
    })
})

//todo=>todo.id==id

app.post("/update-todo", (req, res) => {
    const { id, title, completed } = req.body;
    
    fs.readFile(todoFilePath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read todo list" });
        }
        
        try {
            const todoData = JSON.parse(data);
            const todoIndex = todoData.todo.findIndex(todo => todo.id === id);
            
            if (todoIndex === -1) {
                return res.status(404).json({ error: "Todo not found" });
            }
            
            todoData.todo[todoIndex] = { id, title, completed };
            
            fs.writeFile(todoFilePath, JSON.stringify(todoData, null, 4), (writeErr) => {
                if (writeErr) {
                    return res.status(500).json({ error: "Failed to update todo" });
                }
                res.json({ message: 'Todo updated successfully', todo: todoData.todo[todoIndex] });
            });
        } catch (parseErr) {
            return res.status(500).json({ error: "Failed to parse todo data" });
        }
    });
});

app.post("/delete-todo", (req, res) => {
    const { id } = req.body;
    
    fs.readFile(todoFilePath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read todo list" });
        }
        
        try {
            const todoData = JSON.parse(data);
            const todoIndex = todoData.todo.findIndex(todo => todo.id === id);
            
            if (todoIndex === -1) {
                return res.status(404).json({ error: "Todo not found" });
            }
            
            const deletedTodo = todoData.todo.splice(todoIndex, 1)[0];
            
            fs.writeFile(todoFilePath, JSON.stringify(todoData, null, 4), (writeErr) => {
                if (writeErr) {
                    return res.status(500).json({ error: "Failed to delete todo" });
                }
                res.json({ message: 'Todo deleted successfully', deletedTodo });
            });
        } catch (parseErr) {
            return res.status(500).json({ error: "Failed to parse todo data" });
        }
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
