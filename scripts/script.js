const addCase = document.querySelector('.case');
const addButton = document.querySelector('.add');
const list = document.querySelector('.list');
const clear = document.querySelector('.clear');
const error = document.querySelector('.error');
let unique;
let todoList = [];

const displayCases = () => 
    list.innerHTML = todoList.reduce( (acc, {checked, todo}, i) => acc + `
        <li>
            <input class='check' type='checkbox' id='item_${i}' ${checked ? 'checked' : ''}>
            <label for='item_${i}'>${todo}</label>
            <img class='trash' onclick='handleDeleteItem()' id='${i}' src='img/trash-alt-regular.svg'>
        </li>
        `
      ,'');

const handleDeleteItem = () => {
    const id = event.target.getAttribute('id');
    
    todoList.splice(id, 1);
    displayCases();
    localStorage.setItem('todo', JSON.stringify(todoList));
};

const handleClear = () => {
    localStorage.clear();
    location.reload();
};

const handleDeleteErrorMessage = () => {
    error.innerHTML = '';
    addCase.style.border = 'none';
};

const handleAddElement = (event) => {
    const newTodo = {
        todo: addCase.value,
        checked: false
    };

    if (event.key === 'Enter'){
        if(!addCase.value) {
            addCase.style.border = '2px solid red'; 
            error.innerHTML = 'The input field is empty!';
            return false;
        }

        unique = todoList.find( item => addCase.value === item.todo);

        if(unique) {
            addCase.style.border = '2px solid red'; 
            error.innerHTML = 'This case already exists!';
            return false;
        }
        
        todoList.push(newTodo);
        displayCases();
        localStorage.setItem('todo', JSON.stringify(todoList));
        addCase.value = '';

        return true;
    }
};

const handleChangeChecked = () => {
    const valueLabel = list.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML;
    const changeItem = todoList.find( item => item.todo === valueLabel);

    changeItem.checked = !changeItem.checked;
    localStorage.setItem('todo', JSON.stringify(todoList));
};

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayCases();
}

document.addEventListener('keydown', handleDeleteErrorMessage);
document.addEventListener('keyup', handleAddElement);
clear.addEventListener('click', handleClear);
list.addEventListener('change', handleChangeChecked);
