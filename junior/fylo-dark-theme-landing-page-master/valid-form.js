"use strict";

const singUpInput = document.querySelector(".sing-up__input");
const singUpBtn = document.querySelector(".sing-up__btn");
const singUpError = document.querySelector(".sing-up__error");

singUpInput.addEventListener("input", () => {
    if (singUpInput.validity.valid && singUpInput.value.length > 0) {
        singUpError.innerText = "";
    }
});

singUpBtn.addEventListener("click", (e) => {
    if (!singUpInput.validity.valid || singUpInput.value.length === 0) {
        singUpError.innerText = "Please enter a valid email address";
        e.preventDefault();
    } else {
        singUpInput.innerText = "";
    }
});
