import { appState } from "../store/appState.js";
import { handleLimitInput, captureValueLimitCharacters, updateExceedLimit } from "../view/limit-characters-input-view.js";
import { checkLimitCharacters } from "../model/limit-characters-model.js";

const inputLimitCharacters = document.querySelector(".form__input");

// check if the word number exceed the limit characters
export function checkExceedLimitCharacters(totalCharacters) {
    const valueLimit = defineLimitCharacters();
    appState.limitCharacters.isExceed = checkLimitCharacters(totalCharacters, valueLimit);
    updateExceedLimit(appState.limitCharacters.isExceed, valueLimit);
    return appState.limitCharacters.isExceed;
}

// capture the limit characters defined
export function defineLimitCharacters(){
      const valueLimit = Number(captureValueLimitCharacters());
      appState.limitCharacters.limitDefined = valueLimit != 0 ? valueLimit : undefined;
      return valueLimit;
}

inputLimitCharacters.addEventListener("input", handleLimitInput);

