import  { handleLimitInput, captureValueLimitCharacters } from "../view/limit-characters-input-view.js";

const inputLimitCharacters = document.querySelector(".form__input");

export function checkExceedLimitCharacters(totalCharacters){
    let valueLimit = Number(captureValueLimitCharacters());

    return valueLimit;
}

inputLimitCharacters.addEventListener("input", handleLimitInput);

