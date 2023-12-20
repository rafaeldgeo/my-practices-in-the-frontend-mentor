"use strict";

const toogleSwitch = document.querySelector(".toogle-switch").shadowRoot;
const inputCheckbox = toogleSwitch.querySelector(".switch-toggle__input");
const annuallyPrices = [199.99, 249.99, 399.99];
const monthlyPrices = [19.99, 24.99, 39.99];

let setValues = function(planPrices) {
    const cardValues = document.querySelectorAll(".card__value");
    const totalCardValues = cardValues.length;
    for (let i = 0; i < totalCardValues; i++ ) {
        cardValues[i].innerText = planPrices[i];
    }
}

setValues(annuallyPrices);

inputCheckbox.addEventListener("click", ()=> {
    if (inputCheckbox.checked === false) {
        setValues(annuallyPrices);
    } else {
        setValues(monthlyPrices);
    }
});