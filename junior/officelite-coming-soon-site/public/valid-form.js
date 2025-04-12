"use strict";

const form = document.querySelector(".form");
const inputs = Array.from(document.querySelectorAll(".form__input"));

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

function validInputText(input) {
    if (input.value.trim().length > 0) {
        input.classList.remove("form__input--error");
    } else {
        input.classList.add("form__input--erro");
    }
}

function validInputEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const testEmail = emailRegex.test(input.value);
    console.log(testEmail);

    if (testEmail) {
        input.classList.remove("form__input--error");
    } else {
        console.log("entrou");
        input.classList.add("form__input--error");
    }
}

form.addEventListener("input", (e) => {
    const inputElement = e.target;
    validInput(inputElement);
});

form.addEventListener("submit", (e) => {
    let validForm = true;
    inputs.forEach((input) => {
        if (input.value.trim().length === 0) {
            input.classList.add("form__input--error");
            validForm = false;
        }
    })

    if (!validForm) {
        e.preventDefault();
    }

});

