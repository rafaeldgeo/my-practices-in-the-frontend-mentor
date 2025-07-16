"use strict";

const form = document.querySelector(".form");
if (!form) throw new Error("Form not found");

const inputAll = form.querySelectorAll(".form__input");
if (inputAll.length === 0) console.warn("There isn't input");

// sanitize inputs because I'm using type="text" in input
function sanitizeInput(e) {
    let valueInputed = e.target.value;
    
    if (!e.target.name) {
        console.warn("input there isn't name");
        return;
    } 

    switch (e.target.name) {
        case "cardholder":
            valueInputed = valueInputed.replace(/\d/g, ""); // remove number, allow only letters
            break;
        case "cardnumber":
            valueInputed = valueInputed.replace(/[^a-zA-Z0-9]/g, ""); // allow only number and letters
            break;
        case "expmonth":
        case "expyear":
        case "cardcvc":
            valueInputed = valueInputed.replace(/\D/g, ""); // remove any caracteres, allow only numbers
            break;
        default:
    }
    e.target.value = valueInputed;
}

inputAll.forEach((input) => {
    input.addEventListener("input", sanitizeInput);
});


