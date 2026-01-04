const spanCardsValue = document.querySelectorAll(".card__value");
const spanNoSpace = document.querySelector(".card__title-no-space");

// update data of the cards
export function upDateCards(metrics, isExcludeSpaces) {

    showLabelNoSpaces(isExcludeSpaces);

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



