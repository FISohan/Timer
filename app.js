const getById = (id) => document.getElementById(id);
const getInputVal = (id) => parseInt(document.getElementById(id).value);
const setValue = (id, value) => document.getElementById(id).innerText = value;

const startPopup = getById("startPopup");

var hour = 0, mint = 0;
var sec;
var workTime = 0;
var incomeRate;
var income = 0;
var totalSec = 0;
var dollarRate;
function start() {
    startPopup.style.display = "none";
    hour = getInputVal("hour");
    mint = getInputVal("mint");
    incomeRate = getInputVal("incomeRate");
    dollarRate = getInputVal("dollarRate");
    initSec();
    delay();
    isStop = false;
}
var delayTimer;
function delay() {

    delayTimer = setInterval(() => {
        if (!isStop) {
            sec--;
            updateTimer();
            if (sec <= 0) { startClock() }
        }
    }, 1000);
}


function initSec() {
    sec = (hour * 3600) + (mint * 60);
}
var timer;
var isStop = false;
var isStopDelay = false;

function startClock() {
    isStopDelay = true;
    clearInterval(delayTimer);
    getById("incomeSection").style.display = "initial";
    getById("state").style.display = "none"
    updateIncome();

    timer = setInterval(() => {
        if (!isStop) {
            sec++;
            updateTimer();
            setIncome();
        }
    }, 1000);
}

function stopTimer() {
    isStop = true;
    getById("stopBtn").style.display = "none";
    getById("startBtn").style.display = "initial";
}

function startTimer() {
    isStop = false;
    getById("startBtn").style.display = "none";
    getById("stopBtn").style.display = "initial";
}

function updateIncome() {
    setInterval(() => {
        let incomePerSec = incomeRate / (36000);
        setValue("incomeR", `$${(sec * incomePerSec).toFixed(2)}`);
    }, 100);
}

function setIncome() {
    let incomePerSec = incomeRate / 3600;
    income += incomePerSec;
}

function resetTimer() {
    if (isStopDelay) {
        sec = 0;
        setValue("income", `$${income.toFixed(2)} (${(income.toFixed() * dollarRate)}TK)`);
    } else {
        sec = (hour * 3600) + (mint * 60);
    }
    setValue("h", 0);
    setValue("m", 0);
    setValue("s", 0);
}

function getHourMint(sec) {
    let h = Math.trunc(sec / 3600);
    sec -= h * 3600;
    let m = Math.trunc(sec / 60);
    sec -= m * 60;
    return {
        hour: h,
        min: m,
        sec: sec
    }
}

function updateTimer() {
    let time = getHourMint(sec);
    setValue("h", time.hour);
    setValue("m", time.min);
    setValue("s", time.sec);
}

window.addEventListener('load', () => {
    getById("startBtn").style.display = "none";
    getById("incomeSection").style.display = "none";
    setValue("income", `$0`);
})