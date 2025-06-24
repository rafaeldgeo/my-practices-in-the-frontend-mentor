const form = document.querySelector(".form");
const divNumberInputs = form.querySelectorAll(".form__input-container");
const inputsNumber = form.querySelectorAll(".form__input");
const divRadioInputs = form.querySelectorAll(".form__radio-container");
const fieldsetRadio = form.querySelector(".form__fieldset");
const inputsRadio = form.querySelectorAll(".form__radio");
const inputRadioRepayment = inputsRadio[0];
const spanInputRadioError = fieldsetRadio.querySelector(".form__msg-erro");
const btnClear = document.querySelector(".content__btn-clear");
const divResults = document.querySelector(".results");
const divResultShown = divResults.querySelector(".results-shown-here").outerHTML;

if (!form) console.warn("Element form doesn't exist");
if (!fieldsetRadio) console.warn("Element fieldset doesn't exist");
if (!divResults) console.warn("Element doesn't exist");

if (!divNumberInputs || !inputsNumber || !fieldsetRadio || !inputsRadio || !spanInputRadioError) {
    console.warn("There's some problem with elements of the classes .form__input-container, .form__input, .form__radio-container, .form__radio, .form__msg-erro");
}

// format the number input when it's focus  
const focusNumberInput = function (e) {
    const numberInput = e.target;
    const divNumberInput = e.target.parentElement; //.form__input-container
    const spanInputNumberError = divNumberInput.nextElementSibling; // .form__msg-erro
    const spanLabelSecondary = divNumberInput.querySelector(".form__label-secondary");
    if (!divNumberInput || !spanInputNumberError || !spanLabelSecondary) {
        console.warn("There's some problem with elements of the classes .form__input-container, .form__msg-erro .form__label-secondary");
        return;
    }

    if (e.type === "focusin") {
        divNumberInput.classList.add("form__input-container--focus");
        divNumberInput.classList.remove("form__input-container--hover");
        if (!spanLabelSecondary.classList.contains("form__label-secondary--error")) {
            spanLabelSecondary.classList.add("form__label-secondary--focus");
        }
    }

    if (e.type === "focusout") {
        divNumberInput.classList.remove("form__input-container--focus");
        spanLabelSecondary.classList.remove("form__label-secondary--focus");
        if (numberInput.value !== "") {
            divNumberInput.classList.remove("form__input-container--error");
            divNumberInput.classList.add("form__input-container--hover");
            spanLabelSecondary.classList.remove("form__label-secondary--error");
            spanInputNumberError.classList.remove("form__msg-erro--show");
            numberInput.ariaInvalid = "false";
        }
    }
}

// select the radio clicked
const clickRadio = function (e) {
    divRadioInputs.forEach((radio) => {
        if (radio.classList.contains("form__radio--checked")) {
            radio.classList.remove("form__radio--checked");
        }
    });
    const divRadioInput = e.target.closest(".form__radio-container");
    if (!divRadioInput) return;
    const isChecked = divRadioInput.querySelector(".form__radio").checked;
    if (isChecked) {
        divRadioInput.classList.add("form__radio--checked");
        if (spanInputRadioError.classList.contains("form__msg-erro--show")) {
            spanInputRadioError.classList.remove("form__msg-erro--show");
            inputRadioRepayment.ariaInvalid = "false";
        }
    }
}

// check if the inputs are empty
export const checkEmptyInputs = function (e) {

    // check number inputs
    const divFields = form.querySelectorAll(".form__field");
    let hasError = false;
    if (divFields.length === 0) {
        console.warn("There isn't any <div> with the class .form__field");
        return;
    }
    divFields.forEach((divFormField) => {
        const numberInput = divFormField.querySelector(".form__input");
        const divNumberInput = divFormField.querySelector(".form__input-container");
        const spanLabelSecondary = divFormField.querySelector(".form__label-secondary");
        const spanInputNumberError = divFormField.querySelector(".form__msg-erro");
        if (!numberInput || !divNumberInput || !spanLabelSecondary || !spanInputNumberError) {
            console.warn("There's some problem with elements of the classes .form__input, .form__input-container, .form__label-secondary, .form__msg-erro");
            return;
        };
        if (numberInput.value.trim() === "") {
            divNumberInput.classList.add("form__input-container--error");
            divNumberInput.classList.remove("form__input-container--hover");
            spanLabelSecondary.classList.add("form__label-secondary--error");
            spanInputNumberError.classList.add("form__msg-erro--show");
            numberInput.ariaInvalid = "true";
            hasError = true;
        }
    });

    // check radio inputs
    let isChecked = false;
    inputsRadio.forEach((radio) => {
        if (radio.checked) {
            isChecked = true;
        }
    });

    if (!isChecked) {
        hasError = true;
        spanInputRadioError.classList.add("form__msg-erro--show");
        inputRadioRepayment.ariaInvalid = "true";
    }

    if (hasError) {
        hasError = true;
    }

    return hasError;
}

// clear all inputs and show element "results-shown-here"
const clearInputs = function (e) {

    // clear inputs number
    inputsNumber.forEach((input) => {
        input.value = "";
    });

    // clear inputs radio
    divRadioInputs.forEach((radio) => {
        const inputRadio = radio.querySelector(".form__radio");
        inputRadio.checked = false;
        if (radio.classList.contains("form__radio--checked")) {
            radio.classList.remove("form__radio--checked");
        }
    });

    // change element result
    const divResultsYour = divResults.querySelector(".results-your");

    if (divResultsYour) {
        divResults.innerHTML = divResultShown;
    }
}

// listen the number inputs
divNumberInputs.forEach((input) => {
    input.addEventListener("focusin", focusNumberInput);
    input.addEventListener("focusout", focusNumberInput);
});

// listen the radio inputs
divRadioInputs.forEach((radio) => {
    radio.addEventListener("click", clickRadio);
});

// listen button clear all
btnClear.addEventListener("click", clearInputs);