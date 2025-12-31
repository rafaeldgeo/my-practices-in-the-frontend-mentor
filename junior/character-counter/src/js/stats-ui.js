const textArea = document.querySelector(".form__text");
const checkboxLimitCharacters = document.querySelector("#limit-caracters");
const inputLimitCharacters = document.querySelector(".form__input");
const spanCardsValue = document.querySelectorAll(".card__value");
const spanNoSpace = document.querySelector(".card__title-no-space");
const diVWarningLimit = document.querySelector(".form__warning-limit-characters");
const spanWarningLimitValue = diVWarningLimit.querySelector(".form__warning-limit-value");
const spanReadingTime = document.querySelector(".form__reading-time-result");

// check if checkbox exclude spaces is checked
export function checkActivatedExcludeSpace(checkbox) {
    let isChecked = checkbox.checked;
    return isChecked;
}

// input of the caracteres from text area
export function captureTextRealTime() {
    const text = textArea.value.trim();
    return text;
}

// show the input to define limit of characters
function showInputLimitCharacters() {
    const isChecked = checkboxLimitCharacters.checked;
    if (isChecked) {
        inputLimitCharacters.classList.add("form__input--active");
        inputLimitCharacters.setAttribute("aria-hidden", "false");
        inputLimitCharacters.focus();
    } else {
        inputLimitCharacters.setAttribute("aria-hidden", "true");
        inputLimitCharacters.classList.remove("form__input--active");
        inputLimitCharacters.value = "";
    }
}

// update UI
export function updateUI(states) {
    const readingTime = states["readingTime"];

    // show label No Space
    if (states["isExcludeSpaces"]) {
        spanNoSpace.setAttribute("aria-hidden", "false");
    } else {
        spanNoSpace.setAttribute("aria-hidden", "true");
    }
    spanNoSpace.classList.toggle("card__title-no-space--active", states["isExcludeSpaces"]);


    // show result in the cards
    spanCardsValue.forEach(card => {
        if (Object.hasOwn(states, card.id)) {
            card.textContent = states[card.id] > 0 ? states[card.id].toString().padStart(2, "0") : "00";
        }
    })

    // show the time to reading
    if (readingTime === 0) {
        spanReadingTime.textContent = "0 minute";
    } else if (readingTime > 0 && readingTime < 1) {
        spanReadingTime.textContent = "< 1 minute";
    } else {
        spanReadingTime.textContent = `${Math.ceil(readingTime)} minutes`;
    }

    // show mensagem exceeds limit defined
    if (states["limitCharacters"].isExceed) {
        spanWarningLimitValue.textContent = states["limitCharacters"].value;
        diVWarningLimit.setAttribute("aria-hidden", false);
    } else {
        diVWarningLimit.setAttribute("aria-hidden", true);
    }
    textArea.classList.toggle("form__text--error", states["limitCharacters"].isExceed);
    diVWarningLimit.classList.toggle("form__warning-limit-characters--active", states["limitCharacters"].isExceed);
}

checkboxLimitCharacters.addEventListener("change", showInputLimitCharacters);

