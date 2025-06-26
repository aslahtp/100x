function addTodo(event) {
    if (event) event.preventDefault(); // Prevent form submission
    let todoInput = document.getElementById("todo-input");
    let todoList = document.getElementById("todo-list");
    let todoText = todoInput.value
    if (todoText === "") return;
    let li = document.createElement("li");
    li.innerHTML = `${todoText}<button class="button" onclick="deleteTodo(this)">Delete</button> `;
    todoList.appendChild(li);
    todoInput.value = "";
    axios.post("http://localhost:3000/update-todo", {
        todo: todoText
    }).then((response) => {
        console.log("Todo added successfully"+response.data);
    });
}

function getTodoList() {
    axios.get("http://localhost:3000/todo-list").then((response) => {
        const todoList = document.getElementById("todo-list");
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
            const li = document.createElement("li");
            li.innerHTML = `${response.data[i]}<button class="button" onclick="deleteTodo(this)">Delete</button> `;
            todoList.appendChild(li);
        }
    });
}


function deleteTodo(button) {
    let li = button.parentElement;
    li.remove();
    //console.log(li.textContent.slice(0,-7));
    axios.post("http://localhost:3000/delete-todo", {
        todo: li.textContent.slice(0,-7)
    }).then((response) => {
        console.log("Todo deleted successfully"+response.data);
    });
}