import { appState } from "../appState.js";
import { captureTextFromTextArea } from "./text-input-view.js";

// update the text state
export function updateTextState() {
    appState.text = captureTextFromTextArea();
    return appState.text;
}
