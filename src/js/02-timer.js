import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputText = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');

const divTimer = document.querySelector('.timer');
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      // window.alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
      return;
    } 
    btnStart.disabled = false;
  },
};

flatpickr(inputText, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

btnStart.addEventListener('click', () => {
  let flag = -1;
  let timerId = setInterval(() => {
    let referenceTime = new Date(inputText.value) - new Date();
    btnStart.disabled = true;    
    // creating a shimmering effect
    flag *= -1;
    divTimer.style.color = (flag < 0 && referenceTime < 5500) ? 'red' : 'black';
    if (flag < 0) {
      return;
    };
    
    if (referenceTime >= 0) {
      let conversionResult = convertMs(referenceTime);
      spanDays.textContent = conversionResult.days;
      spanHours.textContent = conversionResult.hours.toString().padStart(2, '0');
      spanMinutes.textContent = conversionResult.minutes.toString().padStart(2, '0');
      spanSeconds.textContent = conversionResult.seconds.toString().padStart(2, '0'); 
    } else {
      // window.alert('Countdown finished');
      Notiflix.Notify.success('Countdown finished');
      clearInterval(timerId);
    }    
  }, 500);
});
