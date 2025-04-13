"use strict";

const form = document.querySelector(".form");
const inputs = Array.from(document.querySelectorAll(".form__input"));

// function check the types of inputs and call a function to valid them
function validInput(input) {

    switch (input.type) {
        case "text":
        case "tel":
            validInputText(input);
            break;
        case "email":
            validInputEmail(input);
            break;
        default:
            console.log("error!");
    }
}

// set style of erro if there is
function setStyleError(input, isValid) {
    if (isValid) {
        input.classList.remove("form__input--error");
        input.setAttribute('aria-invalid', 'true');
    } else {
        input.classList.add("form__input--error");
        input.setAttribute('aria-invalid', 'false');
    }
}

// valid input text
function validInputText(input) {
    input.value.trim().length > 0 ? setStyleError(input, true) : setStyleError(input, false);
}

// valid input email
function validInputEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const testEmail = emailRegex.test(input.value);

    testEmail && input.value.trim().length > 0 ? setStyleError(input, true) : setStyleError(input, false);
}

// call each input when it is clicked
form.addEventListener("change", (e) => {
    const inputElement = e.target;
    validInput(inputElement);
});

// check if the inputs are valid
form.addEventListener("submit", (e) => {
    let validForm = true;
    inputs.forEach((input) => {
        validInput(input);
        if (input.ariaInvalid === "false") {
            validForm = false;
        }
    })

    if (!validForm) {
        e.preventDefault();
    }

});








