import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

 const promiseForm = document.querySelector('.form');
promiseForm.addEventListener('submit', e => {
  e.preventDefault();


const delayValue = document.querySelector('[name="delay"]');
const stateValue = document.querySelectorAll('[name="state"]');

const delay = parseInt(delayValue.value);
const state = Array.from(stateValue).find(input => input.checked).value;

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(() => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        messageColor: "#FFF",
        messageSize: "16px",
        position: "topRight",
        backgroundColor: "#59A10D"
      });
    })
    .catch(() => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        messageColor: "#FFF",
        messageSize: "16px",
        position: "topRight",
        backgroundColor: "#EF4040"
      });
    });
    // .finally(() => {
    //   promiseForm.reset();
  // });
  promiseForm.reset();
});