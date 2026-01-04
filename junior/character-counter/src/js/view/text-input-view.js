const textArea = document.querySelector(".form__text");
const diVWarningLimit = document.querySelector(".form__warning-limit-characters");
const spanWarningLimitValue = diVWarningLimit.querySelector(".form__warning-limit-value");
// const spanReadingTime = document.querySelector(".form__reading-time-result");

// capture the characters from textarea
export function captureTextFromTextArea() {
    const text = textArea.value.trim();
    return text;
}

export function updateExceedLimit(isExceed, limitDefined, isActived) {
    if (isExceed) {
        spanWarningLimitValue.textContent = limitDefined;
        diVWarningLimit.setAttribute("aria-hidden", "false");
        // textArea.setAttribute("disabled", "disabled");
    } else {
        diVWarningLimit.setAttribute("aria-hidden", "true");
        // textArea.removeAttribute("disabled");
    }
    textArea.classList.toggle("form__text--error", isExceed);
    diVWarningLimit.classList.toggle("form__warning-limit-characters--active", isExceed);
}

