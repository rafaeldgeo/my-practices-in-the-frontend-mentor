const textArea = document.querySelector(".form__text");

// capture the characters from textarea
export function captureTextFromTextArea() {
    const text = textArea.value.trim();
    return text;
}


