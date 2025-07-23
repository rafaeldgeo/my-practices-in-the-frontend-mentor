"use strict";

import { toggleStyleBorderError, setMsgError } from "./form_style.js";

const form = document.querySelector(".form");
if (!form) throw new Error("Form not found");

const divFormFieldAll = form.querySelectorAll(".form__field");

const inputAll = form.querySelectorAll(".form__input");
if (divFormFieldAll.length === 0 || inputAll.length === 0) console.warn("class .form__field or .form__input class not found");

// sanitize inputs because I'm using type="text" in input
const sanitizeInput = (e) => {
    let valueInputed = e.target.value;

    if (!e.target.name) {
        console.warn("input there isn't name");
        return;
    }

    // limit the quantity of caracters in the input
    const limitValueInput = (valueInputed, maxLength) => {
        if (valueInputed.length > maxLength) {
            valueInputed = valueInputed.slice(0, maxLength);
            return valueInputed;
        }
        return valueInputed;
    }

    switch (e.target.name) {
        case "cardholder":
            valueInputed = valueInputed.replace(/\d/g, ""); // remove number, allow only letters
            valueInputed = limitValueInput(valueInputed, 28);
            break;
        case "cardnumber":
            valueInputed = valueInputed.replace(/[^a-zA-Z0-9]/g, ""); // allow only number and letters
            valueInputed = valueInputed.replace(/(.{4})(?=.)/g, "$1 ").toUpperCase(); // format the group 4 digits and space and upper letter
            valueInputed = limitValueInput(valueInputed, 19);
            break;
        case "expmonth":
        case "expyear":
            valueInputed = valueInputed.replace(/\D/g, ""); // remove any caracteres, allow only numbers
            valueInputed = limitValueInput(valueInputed, 2);
            break;
        case "cardcvc":
            valueInputed = valueInputed.replace(/\D/g, ""); // remove any caracteres, allow only numbers
            valueInputed = limitValueInput(valueInputed, 3);
            break;
        default:
    }
    e.target.value = valueInputed;
}

// validates the entered values
const validValueInput = (input, expression, typeError, spanError) => {
    let hasInvalidInput = false;
    if (expression) {
        toggleStyleBorderError(input, true);
        setMsgError(typeError, spanError);
        hasInvalidInput = true;
    } else {
        toggleStyleBorderError(input, false);
        setMsgError("no error", spanError);
    }
    return hasInvalidInput;
};

//check all values inputed
const checkValueInput = (input, spanError) => {
    let inputValueError = false;

    switch (input.name) {
        case "cardnumber":
            inputValueError = validValueInput(input, /[A-Z]/.test(input.value) || input.value.length < 19, "number only", spanError) || inputValueError;
            break;
        case "expmonth":
            inputValueError = validValueInput(input, Number(input.value) === 0 || Number(input.value) > 12 || input.value.length < 2, "wrong format", spanError) || inputValueError;
            break;
        case "expyear":
            inputValueError = validValueInput(input, Number(input.value) === 0 || input.value.length < 2, "wrong format", spanError) || inputValueError;
            break;
        case "cardcvc":
            inputValueError = validValueInput(input, Number(input.value) === 0 || input.value.length < 3, "wrong format", spanError) || inputValueError;
            break;
        default:
    }

    return inputValueError;
}

// check if the inputs are empty
const checkEmptyInput = (input, spanError) => {
    let hasEmptyInput = false;

    if (input.value.length === 0) {
        toggleStyleBorderError(input, true);
        setMsgError("input empty", spanError);
        hasEmptyInput = true;
    } else {
        toggleStyleBorderError(input, false);
        setMsgError("no error", spanError);
    }
    return hasEmptyInput;
}

// check all inputs to valid
export function checkInputs() {
    let anyInputHasError = false;

    for (const divFormField of divFormFieldAll) {
        const inputAllInDivFormField = divFormField.querySelector(".form__input");
        const spanError = divFormField.querySelector(".form__msg-error");
        anyInputHasError = checkEmptyInput(inputAllInDivFormField, spanError) || anyInputHasError; // check if the inputs are empty (true) or full (false)
        if (!anyInputHasError) { // only enter if anyInputHasError is false
            anyInputHasError = checkValueInput(inputAllInDivFormField, spanError); 
        }
    }
    return anyInputHasError;
}

inputAll.forEach((input) => {
    input.addEventListener("input", sanitizeInput);
});
