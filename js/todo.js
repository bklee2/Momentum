const TODO_LS = "todo_list";

const todoForm = document.querySelector('#js-todo-form');
const todoInput = document.querySelector('#js-todo-input');
const todoUl = document.querySelector('#js-todo-ul');


function deleteTodo() {
}

function addTodo() {
}

// todo 객체 {id, text}를 리턴
function newTodo(text) {
    return {
        id: new Date().getTime(),
        text,
    };
}


function createTodoNode(todo) {
    const li = document.createElement('li');
    li.id = todo.id;

    const delBtn = document.createElement('span');
    delBtn.innerText = "❌ ";
    
    const label = document.createElement('label');
    label.innerText = todo.text;

    li.appendChild(delBtn);
    li.appendChild(label);

    return li;
}


// DOM에서 ToDo들을 가져와 todo 객체 array를 리턴
function getCurrentTodoList() {
    const todoNodes = todoUl.querySelectorAll('li');
    const todoList = [...todoNodes].map(x => { return {id: x.id, text: x.querySelector('label').value} });
    return todoList;
}

// localStorage에서 ToDo들을 가져와 todo 객체 array를 리턴
function loadTodoList() {
    const json = localStorage.getItem(TODO_LS);
    const todoList = JSON.parse(json);
    return todoList;
}

// todo 객체 array를 localStorage에 저장
function saveTodoList(todoList) {
    const json = JSON.stringify(todoList);
    localStorage.setItem(TODO_LS, json);
}

// todo 객체 array를 DOM에 그린다.
function paintTodoList(newTodoList) {
    // 1 2 3   old 
    //   2 3 4 new  // del 1, add 4
    //todoList.filter

    const a = [];
    const b = [];

    const oldTodoList = getCurrentTodoList();
    //const intersectionKeys = newTodoList.filter(x => oldTodoList.findIndex(y => x.id == y.id) >= 0)
    //const todoIntersected = newTodoList.filter(x => oldTodoList.findIndex(y => x.id == y.id) >= 0); // 교집합

    const todoDeleted = oldTodoList.filter(x => newTodoList.findIndex(y => x.id == y.id) < 0); // 삭제된 것
    const todoAdded = newTodoList.filter(x => oldTodoList.findIndex(y => x.id == y.id) < 0); // 추가된 것

    console.log(oldTodoList);
    console.log(todoDeleted);
    console.log(todoAdded);
    // const todoNodes = todoUl.querySelectorAll('li');
    // const todoList = [...todoNodes].map(x => { return {id: x.id, text: x.value} });

    todoDeleted.forEach(todo => {
        const todoNode = document.getElementById(todo.id);
        todoUl.removeChild(todoNode);
    });

    todoAdded.forEach(todo => {
        // 노드 생성
        // 노드 추가
        const todoNode = createTodoNode(todo);
        todoUl.appendChild(todoNode);
    });

}

function onTodoFormSubmit(e) {
    e.preventDefault();

    //console.log(todoInput.value);

    const text = todoInput.value.trim();
    todoInput.value = "";
    if(text == "") 
        return;
    
    const todo = newTodo(text)
    const newTodoList = getCurrentTodoList().push(todo);
    paintTodoList(newTodoList);

    saveTodoList(newTodoList);
}

function init() {
    // loadLocal
    // not null
    // paint todo

    // add event
    todoForm.addEventListener("submit", onTodoFormSubmit);

    const dummyTodoList = [
        {id: 1, text: "Todo 1"},
        {id: 2, text: "Todo 2"},
        {id: 4, text: "Todo 4"},
    ];
    saveTodoList(dummyTodoList);
    const todoList = loadTodoList(); // must be array
    //console.log(todoList);
    paintTodoList(todoList);
}

init();

