import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const btnStart = document.querySelector('[data-start]');
const fieldDays = document.querySelector('[data-days]');
const fieldHours = document.querySelector('[data-hours]');
const fieldMinutes = document.querySelector('[data-minutes]');
const fieldSeconds = document.querySelector('[data-seconds]');

btnStart.setAttribute('disabled', true);

flatpickr('input#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    //   console.log(selectedDates[0]);
    //   console.log(new Date)
      let intervalID = null;
      if(selectedDates[0] < new Date) {
        window.alert("Please choose a date in the future");
      } else {
        btnStart.removeAttribute('disabled');
      }
      const timer = {
        start () {
            if (this.isActiv) {
                return
            }
            const startTime = selectedDates[0];
            this.isActiv = true;
            intervalID = setInterval(() => {
                const currentTime = new Date;
                const deltaTime = Math.round(startTime - currentTime);
                // console.log(deltaTime);
                const timeComponent = convertMs(deltaTime);
                updateClockface(timeComponent);
                // console.log(timeComponent);
                if(deltaTime <= 0) {
                    clearInterval(intervalID);
                    fieldDays.textContent = `00`;
                    fieldHours.textContent = `00`;
                    fieldMinutes.textContent = `00`;
                    fieldSeconds.textContent = `00`;
                }
            }, 1000);
        },    
    }
    btnStart.addEventListener('click', () => {
        timer.start();
    })
    },
});

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function updateClockface ({ days, hours, minutes, seconds }) {
    fieldDays.textContent = `${days}`;
    fieldHours.textContent = `${hours}`;
    fieldMinutes.textContent = `${minutes}`;
    fieldSeconds.textContent = `${seconds}`;
}
