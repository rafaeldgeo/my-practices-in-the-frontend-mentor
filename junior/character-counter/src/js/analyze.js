const textArea = document.querySelector(".form__text");
const checkBoxes = document.querySelectorAll(".form__checkbox");
const inputLimit = document.querySelector(".form__input");
const regEx = /[^0-9]/g;

let isExcludeSpaces = false;
let limitedCharactersDefined;

// define if the spaces will be excludes
function excludeSpaces(checkbox) {
    isExcludeSpaces = checkbox.checked;
}

// show the input to define limite of characteres
function showInputLimitCharacters(checkbox) {
    if (checkbox.checked) {
        inputLimit.setAttribute("aria-hidden", "false");
        inputLimit.classList.add("form__input--active");
        inputLimit.focus();
    } else {
        inputLimit.setAttribute("aria-hidden", "true");
        inputLimit.classList.remove("form__input--active");
        inputLimit.value = "";
        limitedCharactersDefined = undefined;
    }
}

// define limit of characters
function defineLimitCharacters() {
    inputLimit.value = inputLimit.value.replace(regEx, "");
    const value = Number(inputLimit.value);
    limitedCharactersDefined = value > 0 ? value : undefined;
}

// define the checkbox selected 
function setting(e) {
    const selectedOption = e.target;
    switch (selectedOption.id) {
        case "exclude-spaces":
            excludeSpaces(selectedOption);
            break;
        case "limit-caracters":
            showInputLimitCharacters(selectedOption);
            break;
        default:
    }
}


checkBoxes.forEach(checkbox => checkbox.addEventListener("change", setting));
inputLimit.addEventListener("change", defineLimitCharacters);

function inputText() {

}

textArea.addEventListener("input", inputText);