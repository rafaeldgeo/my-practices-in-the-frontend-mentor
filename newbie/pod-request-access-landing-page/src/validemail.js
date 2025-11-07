"use strict"

const form = document.querySelector(".form");
const formInput = document.querySelector(".form__input");
const formWrapperErro = document.querySelector(".form-wrapper__erro");

if (!form || !formInput) {
    throw new Error("Form or input not found");
}

if (!formWrapperErro) {
    console.warn("Message erro not found");
}

// check if the input is valid
formInput.addEventListener("input",
    function () {
        if (formInput.validity.valid && formInput.value.length > 0) {
            form.classList.remove("form--erro-show");
            formInput.classList.remove("form__input__erro--show");
            formWrapperErro.classList.remove("form-wrapper__erro--show");
        }
    }
);

// check if the input was filled and sets error
form.addEventListener("submit",
    function (e) {
        if (!formInput.validity.valid || formInput.value.length === 0) {
            form.classList.add("form--erro-show");
            formInput.classList.add("form__input__erro--show");
            formWrapperErro.classList.add("form-wrapper__erro--show");
            e.preventDefault();
        }
    }
);
