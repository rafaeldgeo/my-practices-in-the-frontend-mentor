import { appState } from "../store/appState.js";
import { checkActivatedInputLimit } from "../view/checkbox-view.js";
import { showInputLimitCharacters } from "../view/limit-characters-input-view.js";

const checkboxLimitCharacters = document.querySelector("#limit-caracters");

// Update the state of the Limit Characters checkbox and sent to Input limit characters the state
export function updateCheckboxLimitCharactersState() {
  const isActived = checkActivatedInputLimit();
  appState.checkbox.limitCharacters = isActived;
  showInputLimitCharacters(isActived);
}

checkboxLimitCharacters.addEventListener("change", updateCheckboxLimitCharactersState);


