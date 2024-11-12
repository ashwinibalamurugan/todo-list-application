
// Retrieve todo from local storage or initialize an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];

const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");
const dueDateInput = document.getElementById("due-date");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

// Add task
function addTask() {
  const newTask = todoInput.value.trim();
  const dueDate = dueDateInput.value;
  if (newTask !== "") {
    todo.push({ text: newTask, disabled: false, dueDate });
    saveToLocalStorage();
    todoInput.value = "";
    dueDateInput.value = "";
    displayTasks();
    showNotification('Task added!');
  }
}

// Display tasks
function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked" : ""}>
        <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}" onclick="editTask(${index})">${item.text}</p>
        <span class="due-date">${item.dueDate}</span>
      </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () => toggleTask(index));
    todoList.appendChild(p);
  });
  todoCount.textContent = todo.length;
}

// Edit task
function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].text;
  const inputElement = document.createElement("input");
  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();
  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
      displayTasks();
      showNotification('Task updated!');
    }
  });
}

// Toggle task
function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

// Delete all tasks
function deleteAllTasks() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
  showNotification('Tasks deleted!', 'error');
}

// Save to local storage
function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}

// Show notification
function showNotification(message, type = 'success') {
  const notificationElement = document.querySelector('.notification');
  notificationElement.textContent = message;
  notificationElement.classList.add(type);
  setTimeout(() => {
    notificationElement.classList.remove(type);
  }, 3000);
}