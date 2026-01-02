import { appState } from "../appState.js";
import { checkActivatedExcludeSpace } from "./excludeSpaces-view.js";
import { checkActivatedInputLimit, showInputLimitCharacters } from "./limitCharacters-view.js";

// Update the state of the exclude Space checkbox 
export function updateExcludeSpacesState() {
  appState.checkbox.excludeSpaces = checkActivatedExcludeSpace();
  return appState.checkbox.excludeSpaces;
}

// Update the state of the Limit Characters checkbox and sent to Input limit characters the state
export function updateLimitCharactersState() {
  const isActived = checkActivatedInputLimit();
  appState.checkbox.limitCharacters.isActived = isActived;
  showInputLimitCharacters(isActived);
  return isActived;
}
