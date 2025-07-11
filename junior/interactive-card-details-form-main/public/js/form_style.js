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

// check if inputs are empty
export function checkEmptyInput() {
    let hasError = false;

    for (const divFormField of divFormFieldAll) {
        const spanError = divFormField.querySelector(".form__msg-error");
        inputAll.forEach(input => {
            const divFormInputWapper = input.parentElement;
            if (input.value.length === 0) {
                spanError.classList.add("form__msg-error--show");
                divFormInputWapper.classList.add("form__input-wrapper--error-border");
                input.setAttribute("aria-invalid", true);
                hasError = true;
            } else {
                divFormInputWapper.classList.remove("form__input-wrapper--error-border");
                spanError.classList.remove("form__msg-error--show");
                input.setAttribute("aria-invalid", false);
            }
        });

    }
    return hasError;
}


// checkEmptyInput();

