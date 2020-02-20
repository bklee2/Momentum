const TODO_LS = "todo_list";

const todoUl = document.querySelector('#js-todo-ul');

// add(), delete()는 RAM에 객체 하나를 추가, 삭제
// load(), save()는 localStorage에서 객체 리스트를 불러오기, 저장하기
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

// todo 객체 array를 DOM에 그린다.
function paintTodoList(todoList) {
    // 기존 li 모두 삭제
    while(todoUl.hasChildNodes()) {
        todoUl.removeChild(todoUl.lastChild);
    }

    const newTodoList = todoList ? [...todoList] : [];
    // DOM에 li 새로 만들어 추가
    newTodoList.forEach(todo => {
        const todoNode = createTodoNode(todo); // todo 객체를 DOM li 노드로 만듦
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

