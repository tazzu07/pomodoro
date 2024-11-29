

let timeLeft;
let timer;
let isRunning = false;
const workTime = 25 * 60; 
const shortBreakTime = 5 * 60; 
const longBreakTime = 15 * 60; 

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const pomodoroBtn = document.getElementById('pomodoro');
const shortBreakBtn = document.getElementById('short-break');
const longBreakBtn = document.getElementById('long-break');


function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}


function updateDisplay(seconds) {
  timerDisplay.textContent = formatTime(seconds);
}


function startStopTimer() {
  if (isRunning) {
    clearInterval(timer);
    startBtn.textContent = 'start';
    startBtn.classList.remove('active'); 
    isRunning = false;
  } else {
    timer = setInterval(() => {
      timeLeft--;
      updateDisplay(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(timer);
        alert('Time is up!');
        resetTimer();
      }
    }, 1000);
    startBtn.textContent = 'stop';
    startBtn.classList.add('active'); 
    isRunning = true;
  }
}


function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = workTime;
  updateDisplay(timeLeft);
  startBtn.textContent = 'start';
  startBtn.classList.remove('active'); 
}


function setSession(duration) {
  clearInterval(timer);
  isRunning = false;
  timeLeft = duration;
  updateDisplay(timeLeft);
  startBtn.textContent = 'start';
  startBtn.classList.remove('active'); 
}


startBtn.addEventListener('click', startStopTimer);
resetBtn.addEventListener('click', resetTimer);

pomodoroBtn.addEventListener('click', () => {
  setSession(workTime);
  setActiveButton(pomodoroBtn);
});

shortBreakBtn.addEventListener('click', () => {
  setSession(shortBreakTime);
  setActiveButton(shortBreakBtn);
});

longBreakBtn.addEventListener('click', () => {
  setSession(longBreakTime);
  setActiveButton(longBreakBtn);
});


function setActiveButton(button) {
  [pomodoroBtn, shortBreakBtn, longBreakBtn].forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}


setSession(workTime);
