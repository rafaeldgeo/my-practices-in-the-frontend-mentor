const spanCardsValue = document.querySelectorAll(".card__value");
const spanNoSpace = document.querySelector(".card__title-no-space");
const spanReadingTime = document.querySelector(".form__reading-time-result");

// update data of the cards
export function upDateCards(metrics, isExcludeSpaces) {

    showLabelNoSpaces(isExcludeSpaces);
    updateReadingTime(metrics.readingTime);

    // show result in the cards
    spanCardsValue.forEach(card => {
        if (card.id === "characters") {
            card.dataset.count = isExcludeSpaces ? "totalNoSpaceCharacters" : "totalCharacters";
        }

        if (Object.hasOwn(metrics, card.dataset.count)) {
            card.textContent = metrics[card.dataset.count] > 0 ? metrics[card.dataset.count].toString().padStart(2, "0") : "00";
        }
    })
}

// show label No Space
function showLabelNoSpaces(isChecked) {
    if (isChecked) {
        spanNoSpace.setAttribute("aria-hidden", "false");
    } else {
        spanNoSpace.setAttribute("aria-hidden", "true");
    }
    spanNoSpace.classList.toggle("card__title-no-space--active", isChecked);
}

// update reading time
function updateReadingTime(readingTime) {
    if (readingTime === 0) {
        spanReadingTime.textContent = "0 minute";
    } else if (readingTime > 0 && readingTime < 1) {
        spanReadingTime.textContent = "< 1 minute";
    } else {
        spanReadingTime.textContent = `${Math.ceil(readingTime)} minutes`;
    }
}



