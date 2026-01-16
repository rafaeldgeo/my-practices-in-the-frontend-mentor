import { appState } from "../store/appState.js";
import { calculateMetrics } from "../model/text-metrics-model.js";
import { checkActivatedExcludeSpace, checkActivatedInputLimit } from "../view/checkbox-view.js";
import { upDateCards } from "../view/stats-view.js";
import { showInputLimitCharacters } from "../view/limit-characters-input-view.js"
import { checkExceedLimitCharacters } from "../controller/limit-input-controller.js";
import { handleTextInput } from "../controller/text-input-controller.js";
import { handleDensity, generetTop5Result } from "../model/density-model.js";
import { displayTop5Charts } from "../view/density-view.js";

const textArea = document.querySelector(".form__text");
const checkboxExcludeSpaces = document.querySelector("#exclude-spaces");
const checkboxLimitCharacters = document.querySelector("#limit-caracters");
const inputLimitCharacters = document.querySelector(".form__input");


// controlle all states
export function updateApp() {
    handleTextInput(appState.limitCharacters.limitDefined);
    appState.metrics = calculateMetrics(appState.text);
    appState.checkbox.excludeSpaces = checkActivatedExcludeSpace();
    appState.checkbox.limitCharacters = checkActivatedInputLimit();
    showInputLimitCharacters(appState.checkbox.limitCharacters);
    upDateCards(appState.metrics, appState.checkbox.excludeSpaces);
    checkExceedLimitCharacters(appState.metrics.totalCharacters, appState.checkbox.limitCharacters);
    appState.density = handleDensity(appState.text);
    let top5 = generetTop5Result(appState.density);
    displayTop5Charts(top5);

}

textArea.addEventListener("input", updateApp);
checkboxExcludeSpaces.addEventListener("change", updateApp);
checkboxLimitCharacters.addEventListener("change", updateApp);
inputLimitCharacters.addEventListener("blur", updateApp);





