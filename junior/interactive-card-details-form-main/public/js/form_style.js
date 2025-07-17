"use strict";

const form = document.querySelector(".form");
if (!form) throw new Error("Form not found");

const divFormFieldAll = form.querySelectorAll(".form__field");
const divInputWrapperAll = form.querySelectorAll(".form__input-wrapper");
const inputAll = form.querySelectorAll(".form__input");
if (divFormFieldAll === 0 || divInputWrapperAll.length === 0 || inputAll.length === 0) console.warn("class .form__field, .form__input-wrapper or .form__input not found ");

// add and remove border of the divInputWrapper
const toggleStyleBorder = (input, activate = true) => {
    const divInputWrapper = input.parentElement; // .form__input-wrapper
    if (!divInputWrapper) console.warn("The parent element not found");
    divInputWrapper.classList.toggle("form__input-wrapper--hover-focus", activate); //change state of the border
}

for (const input of inputAll) {

    input.addEventListener("mouseenter", () => {
        toggleStyleBorder(input, true);
    });

    input.addEventListener("mouseleave", () => {
        if (document.activeElement !== input) {
            toggleStyleBorder(input, false);
        }
    });

    input.addEventListener("focus", () => {
        toggleStyleBorder(input, true);
    })

    input.addEventListener("blur", () => {
        toggleStyleBorder(input, false);
    })
}

// check if inputs are empty and add and remove red border in the divInputWrapper and shows message error

// enviar um inputall para a função que vai verificar se ele está vazio ou não e retornar o erro

export const toggleStyleBorderError = (input, spanError, activate = true) => {
    const divInputWrapper = input.parentElement;
    divInputWrapper.classList.toggle("form__input-wrapper--error-border", activate);
    if (activate) {
        spanError.setAttribute("id", input.id);
        input.setAttribute("aria-invalid", true);
    } else {
        spanError.removeAttribute("id");
        input.setAttribute("aria-invalid", false);
    }
}

export const setMsgError = (errorType, spanError) => {
    switch (errorType) {
        case "input empty":
            spanError.textContent = "Can’t be blank";
            spanError.classList.add("form__msg-error--show");
            break;
        case "no error":
            spanError.textContent = "";
            spanError.classList.remove("form__msg-error--show");
            break;
        default:
    }
}


