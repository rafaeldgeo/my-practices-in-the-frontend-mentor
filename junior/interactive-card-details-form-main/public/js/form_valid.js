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
    let maxLength = null;

    if (!e.target.name) {
        console.warn("input there isn't name");
        return;
    }

    switch (e.target.name) {
        case "cardholder":
            valueInputed = valueInputed.replace(/\d/g, ""); // remove number, allow only letters
            maxLength = 30; // limit of caracters in the input
            if (valueInputed.length > maxLength) {
                valueInputed = valueInputed.slice(0, maxLength);
            }
            break;
        case "cardnumber":
            valueInputed = valueInputed.replace(/[^a-zA-Z0-9]/g, ""); // allow only number and letters
            valueInputed = valueInputed.replace(/(.{4})(?=.)/g, "$1 ").toUpperCase(); // format the group 4 digits and space
            maxLength = 19; // limit of caracters in the input
            if (valueInputed.length > maxLength) {
                valueInputed = valueInputed.slice(0, maxLength);
            }
            break;
        case "expmonth":
        case "expyear":
            valueInputed = valueInputed.replace(/\D/g, ""); // remove any caracteres, allow only numbers
            maxLength = 2; // limit of numbers in the input
            if (valueInputed.length > maxLength) {
                valueInputed = valueInputed.slice(0, maxLength);
            }
            break;
        case "cardcvc":
            valueInputed = valueInputed.replace(/\D/g, ""); // remove any caracteres, allow only numbers
            maxLength = 3; // limit of numbers in the input
            if (valueInputed.length > maxLength) {
                valueInputed = valueInputed.slice(0, maxLength);
            }
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
            toggleStyleBorderError(input, spanError, true);
            setMsgError("input empty", spanError);
            hasError = true;
        } else {
            toggleStyleBorderError(input, spanError, false);
            setMsgError("no error", spanError);
        }
    });
    return hasError;
}

const validInput = (inputs, spanError) => {
    let hasError = false;
    inputs.forEach((input) => {

        switch (input.name) {
            case "cardholder":
                console.log("cardholder");
                break;
            case "cardnumber":
                console.log("cardnumber");
                break;
            case "expmonth":
            case "expyear":
            case "cardcvc":
                console.log("os 3");
                break;
            default:
        }


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
            validInput(inputAllInDivFormField, spanError);
        }
    }
    return hasError;
}


inputAll.forEach((input) => {
    input.addEventListener("input", sanitizeInput);
});
