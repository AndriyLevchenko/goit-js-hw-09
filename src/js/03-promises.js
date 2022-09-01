import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Пошук елементів

const step = document.querySelector('input[name="step"]');
const delay = document.querySelector('input[name="delay"]');
const amount = document.querySelector('input[name="amount"]');
const form = document.querySelector('.form');

// Функція генератора промісів

function createPromise(position, delay) {
  const promise = new Promise ((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve ({position, delay})
      } else {
        // Reject
        reject ({position, delay})
      }
    }, delay)
  })
  return promise;
}

// Доповнення до функції createPromise

form.addEventListener('submit', e => {
  e.preventDefault();
  let firstDelay = Number(delay.value);
  let stepDelay = Number(step.value);


  for (let i = 0; i < amount.value; i += 1) {
    createPromise(1 + i, firstDelay + i * stepDelay)
      .then(({ position, delay }) => {
        Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});