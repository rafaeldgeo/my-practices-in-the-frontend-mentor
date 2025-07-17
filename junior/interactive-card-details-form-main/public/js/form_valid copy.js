"use strict";
import { toggleStyleBorderError, setMsgError } from "./form_style.js";

const form = document.querySelector(".form");
if (!form) throw new Error("Form not found");

const divFormFieldAll = form.querySelectorAll(".form__field");

const inputAll = form.querySelectorAll(".form__input");
if (inputAll.length === 0) console.warn("There isn't input");

// sanitize inputs because I'm using type="text" in input
const sanitizeInput = (e) => {
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

// check if the inputs are empty
const checkEmptyInput = (inputs, spanError) => {
    let hasError = false;
    inputs.forEach((input) => {
        if (input.value.length === 0) {
            toggleStyleBorderError(input, true);
            setMsgError("input empty", spanError);
            hasError = true;
        } else {
            toggleStyleBorderError(input, false);
            setMsgError("no error", spanError);
        }
    });
    return hasError;
}

const validInput = (inputs, spanError) => {
    let hasError = false;
    inputs.forEach((input) => {
        

    });

}


// check all inputs to valid
export function checkInputs() {
    let hasError = false;

    for (const divFormField of divFormFieldAll) {
        const inputAllInDivFormField = divFormField.querySelectorAll(".form__input");
        const spanError = divFormField.querySelector(".form__msg-error");
        hasError = checkEmptyInput(inputAllInDivFormField, spanError);
        if (!hasError) {
            console.log("sem erro");
        }
    }
    return hasError;
}


inputAll.forEach((input) => {
    input.addEventListener("input", sanitizeInput);
});
