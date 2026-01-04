import { appState } from "../store/appState.js";
import { captureTextFromTextArea, updateExceedLimit } from "../view/text-input-view.js";
import { calculateMetrics } from "../model/text-metrics-model.js";
import { checkActivatedExcludeSpace } from "../view/checkbox-view.js";
import { upDateCards } from "../view/stats-view.js";
import { checkExceedLimitCharacters } from "../controller/limit-input-controller.js";

const textArea = document.querySelector(".form__text");
const checkboxExcludeSpaces = document.querySelector("#exclude-spaces");
const inputLimitCharacters = document.querySelector(".form__input");

// controlle all states
export function updateState() {
    appState.text = captureTextFromTextArea();
    appState.metrics = calculateMetrics(appState.text);
    appState.checkbox.excludeSpaces = checkActivatedExcludeSpace();
    upDateCards(appState.metrics, appState.checkbox.excludeSpaces);
    appState.limitCharacters = checkExceedLimitCharacters(appState.metrics.totalCharacters);
    // appState.checkbox.limitCharacters = defineLimitCharacters();
    // appState.checkbox.limitCharacters.isExceed = checkLimitCharacters(appState.metrics.totalCharacters, appState.checkbox.limitCharacters.limitDefined);
    // updateExceedLimit(appState.checkbox.limitCharacters.isExceed, appState.checkbox.limitCharacters.limitDefined, appState.checkbox.limitCharacters.isActived);
}

textArea.addEventListener("input", updateState);
checkboxExcludeSpaces.addEventListener("change", updateState);
inputLimitCharacters.addEventListener("blur", updateState);




