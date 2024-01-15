import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



const startBtn = document.querySelector("[data-start]");
const daysTimer = document.querySelector("[data-days]");
const hoursTimer = document.querySelector("[data-hours]");
const minutesTimer = document.querySelector("[data-minutes]");
const secondsTimer = document.querySelector("[data-seconds]");

let userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (new Date() < selectedDates[0]) {
            userSelectedDate = selectedDates[0];
            startBtn.disabled = false
        } else {
            makeDisableBtn();
            iziToast.show({
                message: 'Please choose a date in the future',
                color: 'red',
                position: 'topRight'
            });
        }

    },
};
flatpickr("#datetime-picker", options);

startBtn.addEventListener('click', startTheTimer);

function startTheTimer(event) {
    makeDisableBtn();
    event.target.removeEventListener('click', startTheTimer);

    let userSelectedDateInMs = userSelectedDate.getTime();
    let clickedTime = new Date();

    userSelectedDateInMs = Math.ceil(userSelectedDateInMs / 1000) * 1000;
    clickedTime = Math.ceil(clickedTime / 1000) * 1000;

    const intervalId = setInterval(() => {
        const differenceInTime = convertMs(userSelectedDateInMs - clickedTime);

        const { days, hours, minutes, seconds } = differenceInTime;



        if (days < 0 && hours < 0 && minutes < 0 && seconds < 0) {
            clearInterval(intervalId);
            event.target.addEventListener('click', startTheTimer);
        } else {
            daysTimer.innerHTML = pad(days);
            hoursTimer.innerHTML = pad(hours);
            minutesTimer.innerHTML = pad(minutes);
            secondsTimer.innerHTML = pad(seconds);

        }

        userSelectedDateInMs = userSelectedDateInMs - 1000;
    }, 1000);
}


function pad(number) {

    number = number.toString();

    return number.length === 1 ? number.padStart(2, '0') : number;
}

function makeDisableBtn() {
    startBtn.disabled = true;
}

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