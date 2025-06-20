const formInputs = document.querySelectorAll(".form__input-container");
const formRadios = document.querySelectorAll(".form__radio-container");
const form = document.querySelector(".form");

const focusInput = function (e) {
    const input = e.target;
    const divInputContainer = e.target.parentElement;
    const spanError = divInputContainer.nextElementSibling;
    const spanLabelSecondary = divInputContainer.querySelector(".form__label-secondary");
    if (!spanLabelSecondary) return;

    if (e.type === "focusin") {
        divInputContainer.classList.add("form__input-container--focus");
        divInputContainer.classList.remove("form__input-container--hover");
        if (!spanLabelSecondary.classList.contains("form__label-secondary--error")) {
            spanLabelSecondary.classList.add("form__label-secondary--focus");
        }
    }

    if (e.type === "focusout") {
        divInputContainer.classList.remove("form__input-container--focus");
        spanLabelSecondary.classList.remove("form__label-secondary--focus");
        if (input.value !== "") {
            divInputContainer.classList.remove("form__input-container--error");
            divInputContainer.classList.add("form__input-container--hover");
            spanLabelSecondary.classList.remove("form__label-secondary--error");
            spanError.classList.remove("form__msg-erro--show");
            input.ariaInvalid = "false";
        }
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

// check if the inputs are empty
export const checkEmptyInputs = function (e) {
    const divFields = form.querySelectorAll(".form__field");
    let hasError = false;
    if (divFields.length === 0) {
        console.warn("There isn't any <div> with the class .form__field");
        return;
    }
    divFields.forEach((divFormField) => {
        const input = divFormField.querySelector(".form__input");
        const divInputContainer = divFormField.querySelector(".form__input-container");
        const spanLabelSecondary = divFormField.querySelector(".form__label-secondary");
        const spanError = divFormField.querySelector(".form__msg-erro");
        if (!input || !divInputContainer || !spanLabelSecondary || !spanError) {
            console.warn("There's some problem with elements of the classes .form__input, .form__input-container, .form__label-secondary, .form__msg-erro");
            return;
        };
        if (input.value.trim() === "") {
            divInputContainer.classList.add("form__input-container--error");
            divInputContainer.classList.remove("form__input-container--hover");
            spanLabelSecondary.classList.add("form__label-secondary--error");
            spanError.classList.add("form__msg-erro--show");
            input.ariaInvalid = "true";
            hasError = true;
        } 

        if (hasError === true) {
            e.preventDefault();
        }
    });
}



