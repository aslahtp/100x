const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let data = {
  todo: [
    {
      id: 1,
      user_id: 1,
      title: "buy groceries",
      completed: false,
    },
    {
      id: 2,
      user_id: 2,
      title: "finish the project",
      completed: false,
    },
    {
      id: 3,
      user_id: 3,
      title: "take medicine",
      completed: false,
    },
    {
      id: 4,
      user_id: 1,
      title: "buy groceries",
      completed: false,
    },
    {
      id: 5,
      user_id: 2,
      title: "finish the project",
      completed: false,
    },
  ],
  user: [
    {
      user_id: 1,
      user_name: "John Doe",
      password: "123456",
    },
    {
      user_id: 2,
      user_name: "Jane Doe",
      password: "123456",
    },
    {
      user_id: 3,
      user_name: "Jim Beam",
      password: "123456",
    },
  ],
};

app.get("/todo-list", (req, res) => {
  res.json(data);
});

app.post("/update-todo", (req, res) => {
  data.push(req.body.todo);
  res.json(data);
});

app.post("/delete-todo", (req, res) => {
  let d1 = req.body.todo;
  console.log(d1);
  data = data.filter((todo) => todo !== d1);
  res.json(data);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
