import {
  toDoList, bottomContainer, countPending, counterCompleted,
} from '/app.js';

function getLocalStorage() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  return todos;
}

export function saveLocalToDos(todo) {
  const todos = getLocalStorage();
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

export function getTodos() {
  const todos = getLocalStorage();
  todos.forEach((todo) => {
    document.querySelector('.noToDos').style.display = 'none';
    // Make Div
    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add('toDoList__item');

    // Checked Button
    const checkedMarkButton = document.createElement('button');
    checkedMarkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    checkedMarkButton.classList.add('button--checked');
    toDoDiv.appendChild(checkedMarkButton);

    // Make li
    const toDoLi = document.createElement('li');
    toDoLi.innerText = todo;
    // toDoLi.classList.add('toDoList__item');
    toDoDiv.appendChild(toDoLi);

    // Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashButton.classList.add('button--trash');
    toDoDiv.appendChild(trashButton);

    // Add item to the list
    toDoList.appendChild(toDoDiv);

    bottomContainer.style.display = 'flex';
    countPending();
    counterCompleted();
  });
}

export function removeTodos(todo) {
  const todos = getLocalStorage();
  const toDoIndex = todo.children[1].innerText;
  todos.splice(todos.indexOf(toDoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
