import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker");
const button = document.querySelector("button");

document.addEventListener('DOMContentLoaded', () => {
  button.disabled = true;


const datePicker = flatpickr(input, {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose(selectedDates,) {
        console.log(selectedDates[0]);

        if (selectedDates[0].getTime() <= new Date().getTime()) {
          iziToast.error({
            message: "Please choose a date in the future",
            position: "topRight"
          });
          button.setAttribute("disabled", true);
        } else {
          button.removeAttribute("disabled");
        }
      },
});
  
let timerInterval;

    document.querySelector('[data-start]').addEventListener('click', () => {
      const userSelectedDate = datePicker.selectedDates[0];
      const currentDate = new Date();

      if (userSelectedDate > currentDate) {
        updateTimer(userSelectedDate - currentDate);
        button.setAttribute("disabled", true);
        input.setAttribute("disabled", true);

        timerInterval = setInterval(() => {
          const currentTime = new Date();
          const timeRemaining = userSelectedDate - currentTime;

          if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            updateTimer(0);
            button.removeAttribute("disabled");
            input.removeAttribute("disabled");
          } else {
            updateTimer(timeRemaining);
          }
        }, 1000);
      }
    });

       function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

    function updateTimer(time) {
      const { days, hours, minutes, seconds } = convertMs(time);
      document.querySelector('[data-days]').textContent = addLeadingZero(days);
      document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
      document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
      document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
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
  };
  });