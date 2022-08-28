function getRandomHexColor () {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const changeColorStart = document.querySelector('[data-start]');
const changeColorStop = document.querySelector('[data-stop]');
const changeColorBody = document.querySelector('body');

changeColorStart.addEventListener('click', (e) => {
    const timerId = setInterval(function() {
        document.body.style.backgroundColor = getRandomHexColor();
        changeColorStart.setAttribute('disabled', false);
        if (setInterval) {
            changeColorStart.setAttribute('disabled', false);
        }
    }, 1000);
    
    changeColorStop.addEventListener('click', (e) => {
        clearInterval(timerId);
        changeColorStart.removeAttribute('disabled');
    });
});



