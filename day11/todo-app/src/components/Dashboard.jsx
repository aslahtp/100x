import { useState, useEffect } from "react";
import axios from "axios";

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

function TodoSearch({ searchText, performSearch, clearSearch }) {
    return (
        <div>
            <input id="search-input" placeholder="Search" className="search-input" type="text" onChange={performSearch} value={searchText} />
            <button className="clear-button" onClick={clearSearch} disabled={!searchText}>Clear</button>
        </div>
    )
}

function Dashboard() {
    const [todos, setTodos] = useState([]);
    const [searchText, setSearchText] = useState("");

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

    function performSearch(e) {
        const value = e.target.value;
        setSearchText(value);
        axios.get(`http://localhost:3000/todos/search?search=${encodeURIComponent(value || '')}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
            .then(res => {
                setTodos(res.data.todos);
            })
            .catch(err => {
                console.error("Search error:", err);
                // Fallback to regular todos endpoint if search fails
                loadTodos();
            });
    }

    function clearSearch() {
        setSearchText("");
        loadTodos();
    }

    return (
        <>
            <TodoHeader />
            <TodoInput addTodo={addTodo} />
            <TodoSearch searchText={searchText} performSearch={performSearch} clearSearch={clearSearch} />
            <TodoList todos={todos} deleteTodo={deleteTodo} />
        </>
    )
}

export default Dashboard;