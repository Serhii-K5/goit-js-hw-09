function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStop.disabled = true;
let firstValue = 0;

btnStop.addEventListener('click', () => {
  clearInterval(firstValue);
  btnStart.disabled = false;
  btnStop.disabled = true;
});
  
btnStart.addEventListener('click', () => {
  btnStart.disabled = true;
  btnStop.disabled = false;

  firstValue = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
});

