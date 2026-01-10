const textArea = document.querySelector(".form__text");

// capture the characters from textarea
export function captureTextFromTextArea() {
    const text = textArea.value;
    return text;
}

// show the value of textArea
export function showTextInput(textInput, textState, isInputLimited) {
    if (isInputLimited) {
        textArea.value = textInput;
    } else {
        textArea.value = textState;
    }

}
