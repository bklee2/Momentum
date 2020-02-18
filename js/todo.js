const TODO_LS = "todo_list";

const todoForm = document.querySelector('#js-todo-form');
const todo = document.querySelector('#js-todo');
const todoUl = document.querySelector('#js-todo-ul');


function onTodoFormSubmit(e) {
    e.preventDefault();

    console.log(todo.value);
    // const name = document.querySelector('#js-name');
    // localStorage.setItem(USER_NAME, name.value);
    
    // make li
    // add li

    // add todo list
    // save todo list

    // load todo list

    // delete li
    // paint todo list

    todo.value = "";

    // refreshGreetings();
    
    // save

}

function init() {
    // loadLocal
    // not null
    // paint todo

    // add event
    todoForm.addEventListener("submit", onTodoFormSubmit);
}

init();

