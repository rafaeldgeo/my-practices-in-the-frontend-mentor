const checkboxLimitCharacters = document.querySelector("#limit-caracters");
const inputLimitCharacters = document.querySelector(".form__input");

// check if exclude spaces checkbox is checked
export function checkActivatedInputLimit(){
    return checkboxLimitCharacters.checked;
}

// show the input to define limit of characters
export function showInputLimitCharacters(isChecked) {
    if (isChecked) {
        inputLimitCharacters.classList.add("form__input--active");
        inputLimitCharacters.setAttribute("aria-hidden", "false");
        inputLimitCharacters.focus();
    } else {
        inputLimitCharacters.setAttribute("aria-hidden", "true");
        inputLimitCharacters.classList.remove("form__input--active");
        inputLimitCharacters.value = "";
    }
}

