let timer;
let seconds = 0;
let isRunning = false;
const laps = [];

const display = document.getElementById('time-display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps-list');
const themeSwitch = document.getElementById('themeSwitch');

function formatTime(sec) {
  const hrs = String(Math.floor(sec / 3600)).padStart(2, '0');
  const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
  const secs = String(sec % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function updateDisplay() {
  display.textContent = formatTime(seconds);
}

function toggleStartStop() {
  if (!isRunning) {
    timer = setInterval(() => {
      seconds++;
      updateDisplay();
    }, 1000);
    startStopBtn.textContent = 'Stop';
    isRunning = true;
  } else {
    clearInterval(timer);
    startStopBtn.textContent = 'Start';
    isRunning = false;
  }
}

function resetTimer() {
  clearInterval(timer);
  seconds = 0;
  updateDisplay();
  laps.length = 0;
  lapsList.innerHTML = '';
  startStopBtn.textContent = 'Start';
  isRunning = false;
}

function recordLap() {
  if (isRunning) {
    const lapTime = formatTime(seconds);
    laps.push(lapTime);
    const li = document.createElement('li');
    li.textContent = `Lap ${laps.length}: ${lapTime}`;
    lapsList.appendChild(li);
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark', themeSwitch.checked);
}

// Event listeners
startStopBtn.addEventListener('click', toggleStartStop);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
themeSwitch.addEventListener('change', toggleTheme);

// Initialize
updateDisplay();
