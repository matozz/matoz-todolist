//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const body = document.querySelector("body");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Preload
window.addEventListener("load", () => {
  const preload = document.querySelector(".preload");
  preload.classList.add("preload-finish-hide");
  body.classList.add("preload-finish-scroll");
});

//Functions
function addTodo(event) {
  //Prevent form from submitting
  event.preventDefault();
  if (
    todoInput.value.replace(/\s+/g, "").length != 0 &&
    todoInput.value != null
  ) {
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;

    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //ADD TODO TO STORAGE
    saveLocalTodos(todoInput.value);
    //Create Check Mark button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    //Create Trash Mark button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    //Clear Input Value && Default Style
    todoInput.value = "";
    event.target.parentElement.style.boxShadow = "";
    document.querySelector("#todo-input").placeholder =
      "Emm, Let's Do Something";
  } else {
    console.log("NO VALUE");
    // console.log(event);
    console.log(event.target.parentElement);
    const error = event.target.parentElement;
    //Show Error Frame
    error.style.boxShadow = "0 0 5px 5px #ff3d3d";
    //Show Error Text
    document.querySelector("#todo-input").placeholder = "Emm, Write Something";
    //Show Error Shake
    error.classList.add("input-error");
    error.addEventListener("animationend", function () {
      error.classList.remove("input-error");
      //Why Damn 2* Times???
    });
  }
}

//TIME DELAY
var sleep = function (time) {
  var startTime = new Date().getTime() + parseInt(time, 10);
  while (new Date().getTime() < startTime) {}
};

function deleteCheck(e) {
  const item = e.target;
  //Pass Index
  //   let todos;
  //   if (localStorage.getItem("todos") === null) {
  //     todos = [];
  //   } else {
  //     todos = JSON.parse(localStorage.getItem("todos"));
  //   }
  //   const todoIndex = item.parentElement.children[0].innerText;
  //   console.log(todos.indexOf(todoIndex));

  //Delete TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    //Remove From Storage
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      sleep(80); //Avoid First Click Trarnsition Problem
      todo.remove();
    });
    // todo.remove();
  }
  //Check TODO
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    if (todo.classList.contains("completed")) {
      saveLocalCompleted(todo);
    } else {
      removeLocalCompleted(todo);
    }
  }
}

function filterTodo(e) {
  const todos = todoList.children;
  for (var i = 0; i < todos.length; i++) {
    switch (e.target.value) {
      case "all":
        todos[i].style.display = "flex";
        break;
      case "completed":
        if (todos[i].classList.contains("completed")) {
          todos[i].style.display = "flex";
        } else {
          todos[i].style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todos[i].classList.contains("completed")) {
          todos[i].style.display = "flex";
        } else {
          todos[i].style.display = "none";
        }
      default:
        break;
    }
  }
  //   todos.forEach(function (todo) {

  //   });
}

function saveLocalTodos(todo) {
  //CHECK IF Already Have
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Create Check Mark button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    //Create Trash Mark button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function saveLocalCompleted(todo) {
  let todosCompleted;
  if (localStorage.getItem("todos-completed") === null) {
    todosCompleted = [];
  } else {
    todosCompleted = JSON.parse(localStorage.getItem("todos-completed"));
  }
  todosCompleted.push(todo.children[0].innerText);
  localStorage.setItem("todos-completed", JSON.stringify(todosCompleted));
}

function removeLocalCompleted(todo) {
  let todosCompleted;
  if (localStorage.getItem("todos-completed") === null) {
    todosCompleted = [];
  } else {
    todosCompleted = JSON.parse(localStorage.getItem("todos-completed"));
  }
  const completeIndex = todo.children[0].innerText;
  todosCompleted.splice(todosCompleted.indexOf(completeIndex), 1);
  localStorage.setItem("todos-completed", JSON.stringify(todosCompleted));
}
