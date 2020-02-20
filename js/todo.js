const TODO_LS = "todo_list";

const todoUl = document.querySelector('#js-todo-ul');

const TodoListLS = {
    load() { // localStorage에서 ToDo들을 가져와 todo 객체 배열로 변환하여 리턴
        const todoList = function() {
            try {
                const json = localStorage.getItem(TODO_LS);
                return json ? JSON.parse(json) : [];
            } catch (error) {
                return [];
            }
        }();
        return todoList;
    },
    save(todoList) { // todo 객체 배열을 localStorage에 저장
        const json = JSON.stringify(todoList);
        localStorage.setItem(TODO_LS, json);
    },
    newTodo(text) { // text를 받아서 todo 객체 {id, text}를 리턴
        return {
            id: new Date().getTime(),
            text,
        };
    },
    add(text) { // text를 받아서 localStorage에 todo 객체를 추가
        const newTodoList = [...TodoListLS.load(), TodoListLS.newTodo(text)]; // 로컬 스토리지에서 가져온 리스트에 신규 todo를 추가
        TodoListLS.save(newTodoList); // 로컬 스토리지에서 바뀐 내용을 저장
    },
    delete(id) { // id를 받아서 localStorage에 todo 객체를 삭제
        const newTodoList = TodoListLS.load().filter(x => x.id != id); // 해당 id만 제외
        TodoListLS.save(newTodoList); // 로컬 스토리지에서 바뀐 내용을 저장
    },
};

// todo 객체를 받아서 DOM li 노드로 만들어 반환
function createTodoNode(todo) {    
    const delBtn = document.createElement('span'); // 삭제 버튼
    delBtn.innerText = "❌ ";
    delBtn.addEventListener("click", e => {
        TodoListLS.delete(e.currentTarget.parentNode.id);
        paintTodoList(TodoListLS.load()); // 화면에 반영
    });
    
    const label = document.createElement('label'); // text label
    label.innerText = todo.text;

    const li = document.createElement('li');
    li.id = todo.id;
    li.appendChild(delBtn);
    li.appendChild(label);

    return li;
}


// 화면에 그려져있는 todo 리스트를 todo 객체 배열로 변환하여 리턴
function getTodoList() {
    const todoNodes = todoUl.querySelectorAll('li');
    const todoList = [...todoNodes].map(x => { 
        return {
            id: x.id, 
            text: x.querySelector('label').value
        } 
    });
    
    return todoList;
}

// todo 객체 array를 DOM에 그린다.
function paintTodoList(todoList) {
    const newTodoList = todoList ? todoList : [];
    const oldTodoList = getTodoList(); // 화면에 그려져있는 todo 리스트

    const todoDeleted = oldTodoList.filter(x => newTodoList.findIndex(y => x.id == y.id) < 0); // 삭제된 것
    const todoAdded = newTodoList.filter(x => oldTodoList.findIndex(y => x.id == y.id) < 0); // 추가된 것

    // console.log(oldTodoList);
    // console.log(todoDeleted);
    // console.log(todoAdded);

    // DOM에서 삭제
    todoDeleted.forEach(todo => {
        const todoNode = document.getElementById(todo.id);
        todoUl.removeChild(todoNode);
    });

    // DOM에서 추가
    todoAdded.forEach(todo => {
        const todoNode = createTodoNode(todo);
        todoUl.appendChild(todoNode);
    });
}

function onTodoFormSubmit(e) {
    e.preventDefault();

    // Input에서 값 읽기
    const text = function(){
        const todoInput = document.querySelector('#js-todo-input');
        const t = todoInput.value.trim();
        todoInput.value = "";
        return t;
    }();
    if(text == "") 
        return;

    TodoListLS.add(text);  
    paintTodoList(TodoListLS.load()); // 화면에 반영
}

function init() {
    const todoForm = document.querySelector('#js-todo-form');
    todoForm.addEventListener("submit", onTodoFormSubmit);

    const todoList = TodoListLS.load(); // 로컬 스토리지에서 todo 리스트를 가져옴
    //console.log(todoList);
    paintTodoList(todoList);
}

init();

