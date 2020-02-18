function toTimeText(d) {
    const h = d.getHours() >= 10 ? d.getHours() : '0' + d.getHours();
    const m = d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes();
    const s = d.getSeconds() >= 10 ? d.getSeconds() : '0' + d.getSeconds();

    const t = `${h}:${m}:${s}`;
    return t;
}

function refreshJsClock() {
    const jsClock = document.querySelector('.js-clock > h1');
    jsClock.innerHTML =  toTimeText(new Date());
}

function init() {
    refreshJsClock();
    setInterval(() => refreshJsClock(), 1000);
}

init();