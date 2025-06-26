function addTodo(event) {
    if (event) event.preventDefault(); // Prevent form submission
    let todoInput = document.getElementById("todo-input");
    let todoList = document.getElementById("todo-list");
    let todoText = todoInput.value;
    if (todoText === "") return;
    // Create a new todo object (id will be set by backend or can be generated here for demo)
    let newTodo = {
        // id: Date.now(), // Optionally generate a temp id
        title: todoText,
        completed: false,
        user_id: 1 // Default user for demo
    };
    axios.post("http://localhost:3000/update-todo", {
        todo: newTodo
    }).then((response) => {
        // Clear and reload the list
        todoInput.value = "";
        getTodoList();
    });
}

function getTodoList() {
    axios.get("http://localhost:3000/todo-list").then((response) => {
        const todoList = document.getElementById("todo-list");
        todoList.innerHTML = "";
        // response.data is an object with a 'todo' array
        const todos = response.data.todo;
        for (let i = 0; i < todos.length; i++) {
            const todo = todos[i];
            const li = document.createElement("li");
            li.innerHTML = `${todo.title} <button class="button" onclick="deleteTodo(${todo.id})">Delete</button>`;
            li.setAttribute("data-id", todo.id);
            todoList.appendChild(li);
        }
    });
}

function deleteTodo(id) {
    axios.post("http://localhost:3000/delete-todo", {
        todo: { id: id }
    }).then((response) => {
        getTodoList();
    });
}