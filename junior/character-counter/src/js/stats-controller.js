import { countCharacters, countWordsSenteces, calcReadingTime, sanitizeLimitInput, checkLimitCharacters } from "./stats-logic.js";
import { captureTextRealTime, checkActivatedExcludeSpace, updateUI } from "./stats-ui.js";

const textArea = document.querySelector(".form__text");
const checkboxExcludeSpaces = document.querySelector("#exclude-spaces");
const checkboxLimitCharacters = document.querySelector("#limit-caracters");
const inputLimitCharacters = document.querySelector(".form__input");

// Update values from UI -> Controller
export function updateCharactersStats() {
    const uiState = readUIState();
    const stats = calculateState(uiState);
    updateUI(stats);
}

// read states
function readUIState() {
    return {
        text: captureTextRealTime(),
        limitDefined: sanitizeLimitInput(inputLimitCharacters.value),
        isExcludeSpaces: checkActivatedExcludeSpace(checkboxExcludeSpaces),
        isLimitActive: checkboxLimitCharacters.checked,
    }
}

// Get the values of the states
function calculateState({ text, limitDefined, isExcludeSpaces, isLimitActive }) {
    const characters = countCharacters(text, isExcludeSpaces ? "noSpaces" : "original");
    const { totalWords, totalSentences } = countWordsSenteces(text);
    const readingTime = calcReadingTime(totalWords);
    const limitCharacters = !isExcludeSpaces && isLimitActive
        ? checkLimitCharacters(characters, limitDefined)
        : { isExceed: false, value: undefined };

    return {characters, words: totalWords, sentences: totalSentences, readingTime, isExcludeSpaces, limitCharacters};
}

// Sanitize input when the user types letter and symbols
function handleLimitInput(){
    const sanitizeValue = sanitizeLimitInput(inputLimitCharacters.value);
    inputLimitCharacters.value = sanitizeValue;
}

// Get the value of the input limit
function handleStatesInputLimit() {
    updateCharactersStats();
}

textArea.addEventListener("input", updateCharactersStats);
checkboxExcludeSpaces.addEventListener("change", updateCharactersStats);
inputLimitCharacters.addEventListener("input", handleLimitInput);
inputLimitCharacters.addEventListener("blur",  handleStatesInputLimit);
checkboxLimitCharacters.addEventListener("change", updateCharactersStats);
