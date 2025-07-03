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
                setTodos(todos.filter(todo => todo.id !== todoId));
            })
            .catch(err => {
                console.log(err);
            });
    }

    function performSearch(searchTerm) {
        console.log("Searching for:", searchTerm || "all todos");

        // Always use the search endpoint - backend handles empty searches properly
        axios.get(`http://localhost:3000/todos/search?search=${encodeURIComponent(searchTerm || '')}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
            .then(res => {
                setTodos(res.data.todos);
                console.log("Search results:", res.data.todos);
            })
            .catch(err => {
                console.error("Search error:", err);
                // Fallback to regular todos endpoint if search fails
                loadTodos();
            });
    }

    function TodoList({ todos, deleteTodo }) {
        return (
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
        )
    }

    function TodoInput({ addTodo }) {
        return (
            <div>
                <input id="todo-input" type="text" placeholder="Add a new todo" />
                <button className="add-button" onClick={addTodo}>Add</button>
            </div>
        )
    }

    function TodoHeader() {
        return (
            <div>
                <h1>Todo App</h1>
                <i> Welcome {localStorage.getItem("username")}</i><br /><br />
            </div>
        )
    }

    function TodoSearch({ performSearch }) {
        return (
            <div>
                <input id="search-input" placeholder="Search" className="search-input" type="text" onChange={e => performSearch(e.target.value)} />
            </div>
        )
    }


    return (
        <>
            <TodoHeader />
            <TodoInput addTodo={addTodo} />
            <TodoSearch performSearch={performSearch} />
            <TodoList todos={todos} deleteTodo={deleteTodo} />
        </>
    )
}

export default Dashboard;