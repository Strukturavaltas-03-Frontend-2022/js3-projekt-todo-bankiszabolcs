import { getTodos, removeTodos, saveLocalToDos } from './localstorage.js';

const input = document.querySelector('.input');
const button = document.querySelector('button');
export const toDoList = document.querySelector('.toDoList');
const pendingItems = document.querySelector('.pendingItems');
// const completedContainer = document.querySelector('.completedContainer');
// const completedList = document.querySelector('.completedList');
const day = document.querySelector('#day');
const date = document.querySelector('#date');
const numbCompletedItems = document.querySelector('.numbCompletedItems');
export const bottomContainer = document.querySelector('.bottomContainer');
const hideComplete = document.querySelector('.hideComplete');
const checkbox = document.querySelector('#checkit');
const clearButton = document.querySelector('.clearAll');

const now = new Date();
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Event Listeners
window.addEventListener('DOMContentLoaded', getTodos)
button.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteItem);
// toDoList.addEventListener('click', addToCompleted);
clearButton.addEventListener('click', clearAll);
hideComplete.addEventListener('click', () => {
  checkbox.checked === true ? filterToDo() : filterAll();
});
checkbox.addEventListener('click', showOrHide);

// Functions

function setupDate() {
  day.textContent = days[now.getDay()];
  date.textContent = now.toLocaleDateString('en');
}

setupDate();

export function countPending() {
  const number = Array.from(toDoList.children).filter((item) => !item.classList.contains('completed')).length;
  pendingItems.innerText = `You have ${number} pending items`;
}

export function counterCompleted() {
  const completedNumb = Array.from(toDoList.children).filter((item) => item.classList.contains('completed')).length;
  const all = Array.from(toDoList.children).length;
  const sum = (completedNumb / all) * 100;
  numbCompletedItems.innerText = `Completed tasks: ${sum}%`;
  numbCompletedItems.style.display = 'block';
}

function addToDo(event) {
  event.preventDefault();

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
  toDoLi.innerText = input.value;
  // toDoLi.classList.add('toDoList__item');
  toDoDiv.appendChild(toDoLi);
  saveLocalToDos(input.value);

  // Trash Button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  trashButton.classList.add('button--trash');
  toDoDiv.appendChild(trashButton);

  // Add item to the list
  toDoList.appendChild(toDoDiv);

  // Clear input
  input.value = '';

  bottomContainer.style.display = 'flex';
  countPending();
  counterCompleted();
}

/* function addToCompleted(e) {
  counterCompleted();
  const actualItem = e.target;
  completedContainer.style.display = 'flex';
  completedList.style.display = 'block';
  // Make Div
  const completedDiv = document.createElement('div');
  completedDiv.classList.add('toDoList__item');
  completedDiv.classList.add('completedDiv');

  // Make li
  const completedLi = document.createElement('li');
  completedLi.innerText = 'fdfdfdsfdsfdsfds';
  completedDiv.appendChild(completedLi);

  // Add item to the list
  completedList.appendChild(completedDiv);

  countPending();

}
 */
function deleteItem(e) {
  const actualItem = e.target;
  console.log(actualItem);
  if (actualItem.classList[0] === 'button--trash') {
    actualItem.parentElement.classList.add('fall');
    countPending();
    removeTodos(actualItem.parentElement)
    actualItem.parentElement.addEventListener('transitionend', () => {
      actualItem.parentElement.remove();
      pendingItems.innerText = `You have ${toDoList.childElementCount} pending items`;
      if (toDoList.childElementCount === 0) {
        document.querySelector('.noToDos').style.display = 'block';
        pendingItems.style.display = 'none';
        bottomContainer.style.display = 'none';
        numbCompletedItems.style.display = 'none';
      }
    });
  }
  if (actualItem.classList[0] === 'button--checked') {
    actualItem.parentElement.classList.toggle('completed');
    countPending();
    counterCompleted();
  }
}

function filterToDo(e) {
  const toDos = toDoList.children;
  Array.from(toDos).forEach((item) => {
    item.classList.contains('completed') ? item.style.display = 'none' : item.style.display = 'flex';
  });
  countPending();
}

function filterAll(e) {
  const toDos = toDoList.children;
  Array.from(toDos).forEach((item) => {
    item.style.display = 'flex';
  });
  countPending();
}

function showOrHide() {
  const label = document.querySelector('#hideshow');

  if (checkbox.checked === false) {
    label.textContent = 'Hide completed';
  } else {
    label.textContent = 'Show Completed';
  }
  checkbox.checked === false ? true : '';
}

function clearAll() {
  const toDos = toDoList.children;
  console.log('fdfd');
  Array.from(toDos).forEach((item) => item.remove());
  document.querySelector('.noToDos').style.display = 'block';
  pendingItems.style.display = 'none';
  bottomContainer.style.display = 'none';
  numbCompletedItems.style.display = 'none';
  localStorage.clear()
}
