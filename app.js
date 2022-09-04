const input = document.querySelector('.input');
const button = document.querySelector('button');
const toDoList = document.querySelector('.toDoList');
const pendingItems = document.querySelector('.pendingItems');
const completedContainer = document.querySelector('.completedContainer');
const day = document.querySelector('#day');
const date = document.querySelector('#date');
const numbCompletedItems = document.querySelector('.numbCompletedItems');
const bottomContainer = document.querySelector('.bottomContainer');
const hideComplete = document.querySelector('.hideComplete');
const checkbox = document.querySelector('#checkit');

const now = new Date();
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Event Listeners
button.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteItem);
// toDoList.addEventListener('click', addToCompleted);
hideComplete.addEventListener('click', () => {
  checkbox.checked === true ? filterToDo() : filterAll();
});
checkbox.addEventListener('click', showOrHide);

// Functions

function setupDate() {
  day.textContent = days[now.getDay()]
  date.textContent = now.toLocaleDateString('en')
}

setupDate();

function countPending() {
  const number = Array.from(toDoList.children).filter((item) => !item.classList.contains('completed')).length;
  console.log(Array.from(toDoList));
  console.log(number);
  pendingItems.innerText = `You have ${number} pending items`;
}

function addToDo(event) {
  event.preventDefault();

  document.querySelector('.noToDos').style.display = 'none';
  // Make Div
  const toDoDiv = document.createElement('div');
  toDoDiv.classList.add('toDoList__item');

  // Make li
  const toDoLi = document.createElement('li');
  toDoLi.innerText = input.value;
  // toDoLi.classList.add('toDoList__item');
  toDoDiv.appendChild(toDoLi);

  // Checked Button
  const checkedMarkButton = document.createElement('button');
  checkedMarkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  checkedMarkButton.classList.add('button--checked');
  toDoDiv.appendChild(checkedMarkButton);

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
}

function addToCompleted(event) {
  completedContainer.style.display = 'block';
  // Make Div
  const completedDiv = document.createElement('div');
  completedDiv.classList.add('toDoList__item');

  // Make li
  const completedLi = document.createElement('li');
  completedLi.innerText = 'fdfdfdsfdsfdsfds';
  completedDiv.appendChild(completedLi);

  // Add item to the list
  completedContainer.appendChild(completedDiv);

  pendingItems.innerText = `You have ${toDoList.childElementCount} pending items`;
}

function deleteItem(e) {
  const actualItem = e.target;
  console.log(actualItem);
  if (actualItem.classList[0] === 'button--trash') {
    actualItem.parentElement.classList.add('fall');
    actualItem.parentElement.addEventListener('transitionend', () => {
      actualItem.parentElement.remove();
      pendingItems.innerText = `You have ${toDoList.childElementCount} pending items`;
      if (toDoList.childElementCount === 0) {
        document.querySelector('.noToDos').style.display = 'block';
        pendingItems.style.display = 'none';
        bottomContainer.style.display = 'none';
      }
    });
  }

  if (actualItem.classList[0] === 'button--checked') {
    actualItem.parentElement.classList.toggle('completed');
    countPending();
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
  console.log(label);
  console.log(checkbox);
  if (checkbox.checked === false) {
    label.textContent = 'Hide completed';
    console.log('hasmi');
  } else {
    label.textContent = 'Show Completed';
    console.log('kampo');
  }
  checkbox.checked === false ? true : '';
}
