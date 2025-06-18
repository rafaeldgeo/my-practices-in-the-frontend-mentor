const formInputs = document.querySelectorAll(".form__input-container");
const formRadios = document.querySelectorAll(".form__radio-container");

const focusInput = function (e) {
    const clickedFormInputContainer = e.target.parentElement;
    const labelSecondary = clickedFormInputContainer.querySelector(".form__label-secondary");
    if (!labelSecondary) return;

    if (e.type === "focusin") {
        clickedFormInputContainer.classList.add("form__input-container--focus");
        clickedFormInputContainer.classList.remove("form__input-container--hover");
        labelSecondary.classList.add("form__label-secondary--focus");
    }

    if (e.type === "focusout") {
        clickedFormInputContainer.classList.remove("form__input-container--focus");
        clickedFormInputContainer.classList.add("form__input-container--hover");
        labelSecondary.classList.remove("form__label-secondary--focus");
    }
}

formInputs.forEach((input) => {
    input.addEventListener("focusin", focusInput);
    input.addEventListener("focusout", focusInput);
});

const clickRadio = function (e) {
    const formRadioContainers = document.querySelectorAll(".form__radio-container");
    formRadioContainers.forEach((radio) => {
        if (radio.classList.contains("form__radio--checked")) {
            radio.classList.remove("form__radio--checked");
        }
    });
    const clickedFormRadioContainer = e.target.closest(".form__radio-container");
    if (!clickedFormRadioContainer) return;
    const isChecked = clickedFormRadioContainer.querySelector(".form__radio").checked;
    if (isChecked) {
        clickedFormRadioContainer.classList.add("form__radio--checked");
    }
}

formRadios.forEach((radio) => {
    radio.addEventListener("click", clickRadio);
});



