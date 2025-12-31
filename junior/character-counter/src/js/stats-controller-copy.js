import { countCharacters, countWordsSenteces, calcReadingTime, sanitizeLimitInput, checkLimitCharacters } from "./stats-logic.js";
import { captureTextRealTime, checkActivatedExcludeSpace, updateUI, showInputLimitCharacters,  } from "./stats-ui.js";

const textArea = document.querySelector(".form__text");
const checkboxExcludeSpaces = document.querySelector("#exclude-spaces");
const checkboxLimitCharacters = document.querySelector("#limit-caracters");
const inputLimitCharacters = document.querySelector(".form__input");

// Update values from UI
export function updateCharactersStats() {
    const text = captureTextRealTime();
    const isCheckedExcludeSpaces = checkActivatedExcludeSpace(checkboxExcludeSpaces);
    const isShowInputLimitCharacters = showInputLimitCharacters(checkboxLimitCharacters);
    const limitDefined = sanitizeLimitInput(inputLimitCharacters.value);
    let characters = 0;
    let words = 0;
    let sentences = 0;
    let readingTime = 0;
    let isExcludeSpaces = false;
    let limitCharacters = { isExceed: false, value: undefined };
    if (isCheckedExcludeSpaces) {
        characters = countCharacters(text, "noSpaces");
        isExcludeSpaces = true;
    } else {
        characters = countCharacters(text, "original");
        limitCharacters = isShowInputLimitCharacters ? checkLimitCharacters(characters, limitDefined) : { isExceed: false, value: undefined };
    }
    words = countWordsSenteces(text, "original").totalWords;
    sentences = countWordsSenteces(text, "original").totalSentences;
    readingTime = calcReadingTime(words);
    updateUI({ characters, words, sentences, readingTime, isExcludeSpaces, limitCharacters });
    
}

checkboxExcludeSpaces.addEventListener("change", updateCharactersStats);
inputLimitCharacters.addEventListener("blur", updateCharactersStats);
textArea.addEventListener("input", updateCharactersStats);
checkboxLimitCharacters.addEventListener("change", updateCharactersStats);

// Sanitize input when the user types letter and symbols
inputLimitCharacters.addEventListener("input", updateCharactersStats);
