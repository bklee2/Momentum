
// Date 객체를 hh:MM:ss 양식의 시간 문자열로 리턴
function toTimeText(d) {
    const h = d.getHours() >= 10 ? d.getHours() : '0' + d.getHours();
    const m = d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes();
    const s = d.getSeconds() >= 10 ? d.getSeconds() : '0' + d.getSeconds();

    const t = `${h}:${m}:${s}`;
    return t;
}

// 시계를 새로 고침
function refreshJsClock() {
    const jsClock = document.querySelector('#js-clock');
    jsClock.innerHTML =  toTimeText(new Date());
}

function init() {
    refreshJsClock();
    setInterval(() => refreshJsClock(), 1000);
}

init();