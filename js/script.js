
let todos = [];
let editIndex = null;


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        handleAddOrEditTodo();
    });

    render();
});


function handleAddOrEditTodo() {
    const title = document.getElementById("todo-title").value;
    const dueDate = document.getElementById("date-picker").value;


    if (title === "" || dueDate === "") {
        alert("Both fields are required.");
        return;
    }

    if (editIndex !== null) {

        todos[editIndex] = { title, dueDate, completed: todos[editIndex].completed };
        editIndex = null;
    } else {

        todos.push({ title, dueDate, completed: false });
    }

    render();
    resetForm();
}


function deleteTodo(index) {
    todos.splice(index, 1);
    render();
}


function toggleCompletion(index) {
    todos[index].completed = !todos[index].completed;
    render();
}


function editTodo(index) {
    const todo = todos[index];
    document.getElementById("todo-title").value = todo.title;
    document.getElementById("date-picker").value = todo.dueDate;
    editIndex = index;
}


function render() {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";

    todos.forEach((todo, index) => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");


        if (todo.completed) {
            todoItem.classList.add("completed");
        }

        const text = document.createElement("div");
        text.classList.add("todo-text");
        text.innerText = todo.title;

        const date = document.createElement("div");
        date.classList.add("todo-date");
        date.innerText = todo.dueDate;

        const actions = document.createElement("div");
        actions.classList.add("todo-actions");


        const toggleBtn = document.createElement("button");
        toggleBtn.innerText = todo.completed ? "Desmarcar" : "Completado";
        toggleBtn.onclick = () => toggleCompletion(index);


        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Eliminar";
        deleteBtn.onclick = () => deleteTodo(index);


        const editBtn = document.createElement("button");
        editBtn.innerText = "Editar";
        editBtn.onclick = () => editTodo(index);

        actions.appendChild(toggleBtn);
        actions.appendChild(deleteBtn);
        actions.appendChild(editBtn);

        todoItem.appendChild(text);
        todoItem.appendChild(date);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);
    });
}


function resetForm() {
    document.getElementById("todo-title").value = "";
    document.getElementById("date-picker").value = "";
}