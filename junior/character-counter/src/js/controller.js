import { appState } from "./appState.js";
import { updateTextState } from "./text-input/text-input-controller.js";
import { calculateMetrics } from "./text-metrics/text-metrics-model.js";
import { updateExcludeSpacesState, updateLimitCharactersState } from "./checkbox/checkbox-controller.js";
import { upDateCards } from "./stats/stats-view.js"

const textArea = document.querySelector(".form__text");
const checkboxExcludeSpaces = document.querySelector("#exclude-spaces");
const checkboxLimitCharacters = document.querySelector("#limit-caracters");

// controlle all states
export function updateState() {
    const text = updateTextState();
    appState.metrics = calculateMetrics(text);
    const isExcludeSpaces = updateExcludeSpacesState();
    upDateCards(appState.metrics, isExcludeSpaces);
    const isLimitInputCharactersActive = updateLimitCharactersState();
}

textArea.addEventListener("input", updateState);
checkboxExcludeSpaces.addEventListener("change", updateState);
checkboxLimitCharacters.addEventListener("change", updateState);

