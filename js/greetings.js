const USER_NAME = "user_name";

const greetingsForm = document.querySelector('#js-greetings-form');
const greetingsText = document.querySelector('#js-greetings-text');

function refreshGreetings() {
    const userName = localStorage.getItem(USER_NAME);

    if(userName) {
        //greetingsForm.style.visibility = "hidden";
        greetingsForm.hidden = true;
        greetingsText.hidden = false;
    
        const text = `Welcome ${userName} !!`;
        greetingsText.innerHTML = text;
    } else {
        greetingsForm.hidden = false;
        greetingsText.hidden = true;
    }
}

function onGreetingsSubmit(e) {
    e.preventDefault();

    const name = document.querySelector('#js-name');
    localStorage.setItem(USER_NAME, name.value);
    name.value = "";

    refreshGreetings();
}

function init() {
    refreshGreetings();
    greetingsForm.addEventListener("submit", onGreetingsSubmit);
}

init();