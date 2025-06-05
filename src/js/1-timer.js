import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Ukrainian } from "flatpickr/dist/l10n/uk.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const datetimePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysValue = document.querySelector("[data-days]");
const hoursValue = document.querySelector("[data-hours]");
const minutesValue = document.querySelector("[data-minutes]");
const secondsValue = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let countdownIntervalId = null;

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerDisplay(days, hours, minutes, seconds) {
    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
}

const options = {
  dateFormat: "d.m.Y H:i",
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(), 
  locale: Ukrainian,       
  minuteIncrement: 1,      
  onClose(selectedDates) {
    
    const selectedDate = selectedDates[0]; 
    const currentDate = new Date(); 

   
    if (selectedDate <= currentDate) {
      
      iziToast.error({
        message: "Please choose a date in the future",
        position: "topRight",
      });
      startButton.disabled = true; 
      datetimePicker.disabled = false; 
      userSelectedDate = null; 
      return; 
    }

   
    userSelectedDate = selectedDate; 
    startButton.disabled = false;   
  },
};

flatpickr(datetimePicker, options);

startButton.disabled = true;

startButton.addEventListener('click', () => {
  startButton.disabled = true;      
  datetimePicker.disabled = true;   

  
  countdownIntervalId = setInterval(() => {
    const currentTime = Date.now(); 
    const msRemaining = userSelectedDate.getTime() - currentTime;

    if (msRemaining <= 0) {
      clearInterval(countdownIntervalId); 
      updateTimerDisplay(0, 0, 0, 0);   
      datetimePicker.disabled = false; 
      userSelectedDate = null; 
      iziToast.success({ 
        message: "Countdown finished!",
        position: "topRight"
      });
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(msRemaining);

    daysValue.textContent = addLeadingZero(days); 
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
  }, 1000); 
}); 