const textArea = document.querySelector(".form__text");
const checkboxes = document.querySelectorAll(".form__checkbox");
const inputLimit = document.querySelector(".form__input");
const spanTotalCharacters = document.querySelector("#total-characters");
const spanTotalWords = document.querySelector("#word-count");
const spanTotalSenteces = document.querySelector("#sentence-count");
const cardsValue = document.querySelectorAll(".card__value");

const patternLimitInput = /[^0-9]/g;
const patternExcludeSpaces = /[\s]/g;
const patternWords = /\p{L}+/gu;
const patterSentence = /[^.]+\./g;
let isCheckedExcludeSpaces = false;
let limitedCharactersDefined;


// active exclude spaces
function activeExcludeSpaces(checkbox) {
    const text = textArea.value;
    isCheckedExcludeSpaces = checkbox.checked;
    updateCharactersStats(text);
}

// define what type if the count characters
function updateCharactersStats(text) {
    if (isCheckedExcludeSpaces) {
        showStats(countCharacters(text, "noSpaces"));
    } else {
        showStats(countCharacters(text, "original"));
    }
    showStats(countWordsSenteces(text, "original").totalWords);
    showStats(countWordsSenteces(text, "original").totalSentences);
}

// exclude spaces characters
function excludeSpaces(text) {
    return text.replace(patternExcludeSpaces, "");
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
            activeExcludeSpaces(selectedOption)
            break;
        case "limit-caracters":
            showInputLimitCharacters(selectedOption);
            break;
        default:
    }
}

// count the characters by type of the text. Exclude spaces or original 
function countCharacters(text, typeText) {
    let value = typeText === "noSpaces" ? excludeSpaces(text).length : text.length;
    return value;
}

// input of the caracteres
function captureTextRealTime() {
    const text = textArea.value.trim();
    updateCharactersStats(text);
}

function countWordsSenteces(text) {
    const totalCharacters = countCharacters(text, "original");
    const totalWords = totalCharacters > 0 ? text.match(patternWords).length : 0;
    const totalSentences = totalCharacters > 0 && text.match(patterSentence) ? text.match(patterSentence).length : 0;
    return { totalWords, totalSentences }
}

// show the results in the cards
// function showStats(value, typeCount) {
//     switch (typeCount) {
//         case "characters":
//             spanTotalCharacters.textContent = value > 0 ? value.toString().padStart(2, "0") : "00";
//             break;
//         case "words":
//             spanTotalWords.textContent = value > 0 ? value.toString().padStart(2, "0") : "00";
//             break;
//         case "sentences":
//             spanTotalSenteces.textContent = value > 0 ? value.toString().padStart(2, "0") : "00";
//             break;
//         default:
//     }
// }

function showStats(value) {
    cardsValue.forEach(card => {
        
        card.textContent = value > 0 ? value.toString().padStart(2, "0") : "00";
    });
}

checkboxes.forEach(checkbox => checkbox.addEventListener("change", setting));
inputLimit.addEventListener("blur", defineLimitCharacters)
textArea.addEventListener("input", captureTextRealTime);