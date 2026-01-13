import { appState } from "../store/appState.js";
import { captureTextFromTextArea, showTextInput } from "../view/text-input-view.js";
import { checkLimitTextInput } from "../model/text-input-model.js";

// capture the text, check if the limit was exceed and show de message
export function handleTextInput(limitDefined){
    const textInput = captureTextFromTextArea();
    const isInputLimited = checkLimitTextInput(textInput, limitDefined);
    appState.text = isInputLimited ? textInput : appState.text;
    showTextInput(textInput, appState.text, isInputLimited);
}