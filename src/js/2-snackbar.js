import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
form.addEventListener("submit", handleClick);

function handleClick(event) {
    event.preventDefault();
    const { delay, state } = event.target.elements;
    const delayValue = +delay.value;
    const stateValue = state.value;

    setTimeout(() =>
    {
        new Promise((resolve, reject) =>
        {
            if (stateValue === "fulfilled")
            {
                resolve(delayValue);
            } else
            {
                reject(delayValue);
            }
        })
            .then(data => iziToast.success(
                        { 
                         message: `✅ Fulfilled promise in ${delayValue} ms`,
                         position: "topRight"
                        }))
            .catch(error => iziToast.error(
                        { 
                         message: `❌ Rejected promise in ${delayValue} ms`,
                         position: "topRight"
                        }))
    }, delayValue)
    event.target.reset(); 
}
