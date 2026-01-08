import { appState } from "../store/appState.js";
import { handleLimitInput, captureValueLimitCharacters, updateExceedLimit } from "../view/limit-characters-input-view.js";
import { checkLimitCharacters } from "../model/limit-characters-model.js";

const inputLimitCharacters = document.querySelector(".form__input");

export function checkExceedLimitCharacters(totalCharacters) {
    const valueLimit = Number(captureValueLimitCharacters());
    appState.limitCharacters = checkLimitCharacters(totalCharacters, valueLimit);
    updateExceedLimit(appState.limitCharacters.isExceed);
}

inputLimitCharacters.addEventListener("input", handleLimitInput);

