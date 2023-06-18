// getting the reference to the DOM elements
const todoList = document.querySelector('.todo__list');
const todoInput = document.querySelector('.todo__input');
const todoButton = document.querySelector('.todo__button');
const filterList = document.querySelector('.filter__todo');


// creating the to-do div
const createTodo = ele => {
  // create a div tag
  const todoDiv = document.createElement('div');

  // add a class name to the div
  todoDiv.classList.add('todo');

  const newTodo = document.createElement('li');
  newTodo.classList.add('todo__item');

  // make the content of the list item the argument passed
  newTodo.innerText = ele;

  // insert the Li into the div as a child node
  todoDiv.appendChild(newTodo);

  // Check button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = `<i class="fa-solid fa-check""><i/>`;
  completedButton.classList.add('completed__button');
  todoDiv.appendChild(completedButton);

  // Delete Button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = `<i class="fa-solid fa-trash"><i/>`;
  deleteButton.classList.add('delete__button');
  todoDiv.appendChild(deleteButton);

  // insert the created div into the ul tag as a child
  todoList.appendChild(todoDiv);
}

const addTodo = e => {
  e.preventDefault();

  if (todoInput.value.length === 0) {
    alert('Todo cannot be empty');
    return;
  }

  createTodo(todoInput.value);

  // save the input value to local storage
  saveToLocalStorage(todoInput.value);

  // reset the value of the input to an empty string
  todoInput.value = '';
}

const getTodoFromStorage = () => {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  return todos;
}

const saveToLocalStorage = todo => {
  let todos = getTodoFromStorage();

  // push the new to-do into the todos array
  todos.push(todo)

  // save the todos into local storage
  localStorage.setItem('todos', JSON.stringify(todos));
}

// displaying the todos on the page
const getTodos = () => {
  let todos = getTodoFromStorage();

  // for the individual items in the todos array create a new to-do div
  todos.forEach(ele => {
    createTodo(ele);
  })
}

document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);