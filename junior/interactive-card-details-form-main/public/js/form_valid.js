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
            valueInputed = limitValueInput(valueInputed, 30);
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

// check if the inputs are empty
const checkEmptyInput = (inputs, spanError) => {
    let hasError = false;
    inputs.forEach((input) => {   // it's necessary because there are two inputs that sharing same error
        if (input.value.length === 0) {
            toggleStyleBorderError(input, spanError, true);
            setMsgError("input empty", spanError);
            hasError = true;
        } else {
            toggleStyleBorderError(input, spanError, false);
            if (!hasError) setMsgError("no error", spanError);
        }
    });
    return hasError;
}

// validates the entered values
const validValueInput = (input, expression, typeError, spanError) => {
    let hasError = false;
    if (expression) {
        toggleStyleBorderError(input, spanError, true);
        setMsgError(typeError, spanError);
        hasError = true;
    } else {
        toggleStyleBorderError(input, spanError, false);
        if (!hasError) setMsgError("no error", spanError);
    }
    return hasError;
};

// check all values inputed
const checkValueInput = (inputs, spanError) => {
    let hasError = false;
    inputs.forEach((input) => {

        switch (input.name) {
            case "cardnumber":
                hasError = validValueInput(input, /[A-Z]/.test(input.value) || input.value.length < 19, "number only", spanError);
                break;
            case "expmonth":
                hasError = validValueInput(input, Number(input.value) === 0 || Number(input.value) > 12 || input.value.length < 2, "wrong format", spanError);
                break;
            case "expyear":
                hasError = validValueInput(input, Number(input.value) === 0 || input.value.length < 2, "wrong format", spanError);
                break;
            case "cardcvc":
                hasError = validValueInput(input, Number(input.value) === 0 || input.value.length < 3, "wrong format", spanError);
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
            checkValueInput(inputAllInDivFormField, spanError);
        }
    }
    return hasError;
}

// listen input
inputAll.forEach((input) => {
    input.addEventListener("input", sanitizeInput);
});
