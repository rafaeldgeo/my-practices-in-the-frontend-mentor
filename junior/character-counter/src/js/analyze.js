const textArea = document.querySelector(".form__text");
const checkboxes = document.querySelectorAll(".form__checkbox");
const inputLimit = document.querySelector(".form__input");
const spanTotalCharacters = document.querySelector("#total-characters");
const spanTotalWords = document.querySelector("#word-count");
const spanTotalSenteces = document.querySelector("#sentence-count");

const patternLimitInput = /[^0-9]/g;
const patternExcludeSpaces = /[\s]/g;
const patternWords = /\p{L}+/gu;
const patterSentence = /[^.]+\./g;
let isCheckedExcludeSpaces = false;
let limitedCharactersDefined;
let totalCharacters = 0;


// active exclude spaces
function defineCheckbox(checkbox) {
    const text = textArea.value;
    isCheckedExcludeSpaces = checkbox.checked;
    if (isCheckedExcludeSpaces) {
        excludeSpaces(text);
    }
}

// exclude spaces characters
function excludeSpaces(text) {
    let textNoSpaces = text.replace(patternExcludeSpaces, "");
    countStats(textNoSpaces);
    showJoinedCharacters(textNoSpaces);
}

// show the characteres without spaces
function showJoinedCharacters(textNoSpaces) {
    textArea.value = textNoSpaces;
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

// Sanitize input when the user types letter and symbols
inputLimit.addEventListener("input", () => {
    inputLimit.value = inputLimit.value.replace(patternLimitInput, "");
});

// define limit of characters
function defineLimitCharacters() {
    const value = Number(inputLimit.value);
    limitedCharactersDefined = value > 0 ? value : undefined;
}

// define the checkbox selected 
function setting(e) {
    const selectedOption = e.target;
    switch (selectedOption.id) {
        case "exclude-spaces":
            defineCheckbox(selectedOption)
            break;
        case "limit-caracters":
            showInputLimitCharacters(selectedOption);
            break;
        default:
    }
}

// input of the caracteres
function inputText() {
    let textOriginal = textArea.value.trim();
    if (isCheckedExcludeSpaces) {
        excludeSpaces(textOriginal);
        countStats(textOriginal);
    } else {
        countStats(textOriginal);
    }
}

// count the characters, words and sentences
function countStats(text) {
    const totalCharacters = text.length;
    const totalWords = totalCharacters > 0 ? text.match(patternWords).length : 0;
    console.log(text.match(patterSentence));
    const totalSentences = totalCharacters > 0 && text.match(patterSentence) ? text.match(patterSentence).length : 0;
    showStats(totalCharacters, "characters");
    showStats(totalWords, "words");
    showStats(totalSentences, "sentences");
}

// show the results in the cards
function showStats(value, typeCount) {
    switch (typeCount) {
        case "characters":
            spanTotalCharacters.textContent = value > 0 ? value.toString().padStart(2, "0") : "00";
            break;
        case "words":
            spanTotalWords.textContent = value > 0 ? value.toString().padStart(2, "0") : "00";
            break;
        case "sentences":
            spanTotalSenteces.textContent = value > 0 ? value.toString().padStart(2, "0") : "00";
            break;
        default:
    }
}

checkboxes.forEach(checkbox => checkbox.addEventListener("change", setting));
inputLimit.addEventListener("blur", defineLimitCharacters)
textArea.addEventListener("input", inputText);