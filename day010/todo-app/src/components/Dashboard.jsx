import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        // Load existing todos from backend
        loadTodos();
    }, []);

    function loadTodos() {
        axios.get("http://localhost:3000/todos", {
            headers: {
                token: localStorage.getItem("token")
            }
        })
            .then(res => {
                console.log(res.data.todos);
                setTodos(res.data.todos);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function addTodo() {
        const todoText = document.getElementById("todo-input").value;
        if (!todoText.trim()) return;

        const todo = {
            id: Date.now(),
            title: todoText
        };

        // Add to backend
        axios.post("http://localhost:3000/todos",
            { todo: todo },
            { headers: { token: localStorage.getItem("token") } }
        )
            .then(res => {
                console.log(res.data.message);
                // Add the full todo object to local state
                setTodos([...todos, todo]);
                // Clear input
                document.getElementById("todo-input").value = "";
            })
            .catch(err => {
                console.log(err);
            });
    }

    function deleteTodo(todoId) {
        axios.delete(`http://localhost:3000/todos/${todoId}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
            .then(() => {
                // Filter out the specific todo by comparing with the correct ID
                setTodos(todos.filter(todo => todo.id !== todoId));
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            <h1>Todo App</h1>
            <i> Welcome {localStorage.getItem("username")}</i><br></br><br></br>
            <input id="todo-input" type="text" placeholder="Add a new todo" />
            <button onClick={addTodo}>Add</button>

            <div id="todos" className="todos">
                {todos.map(todo => (
                    <div className="wrap" key={todo.id}>
                        <p className="todo">{todo.title}</p>
                        <button
                            className="buttonTodo"
                            onClick={() => deleteTodo(todo.id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Dashboard;