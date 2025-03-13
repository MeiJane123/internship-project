document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const input = document.getElementById("todo-input");
    const taskText = input.value.trim();
    if (taskText === "") return;

    const task = { text: taskText, done: false };
    const li = createTaskElement(task);
    document.getElementById("todo-list").appendChild(li);
    saveTask(task);

    input.value = "";
}

function createTaskElement(task) {
    const li = document.createElement("li");
    li.className = "todo-item";
    if (task.done) {
        li.classList.add("done");
    }

    const span = document.createElement("span");
    span.innerText = task.text;
    span.onclick = function () { toggleDone(span, task.text); };

    const doneBtn = document.createElement("button");
    doneBtn.innerText = "✔";
    doneBtn.classList.add("mark-done");
    doneBtn.onclick = function () { toggleDone(span, task.text); };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "✖";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function () { deleteTask(li, task.text); };

    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    return li;
}

function toggleDone(span, taskText) {
    const li = span.parentElement;
    li.classList.toggle("done");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        if (task.text === taskText) {
            task.done = !task.done;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(li, taskText) {
    li.remove();

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = createTaskElement(task);
        document.getElementById("todo-list").appendChild(li);
    });
}