const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

let intervalId = null;

stopBtn.disabled = true;

function onStartClick() {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 2000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function onStopClick() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
