"use strict";

const inputAll = document.querySelectorAll(".form__input");
if (inputAll.length === 0) console.warn("inputs not found");

const cardDatas = {
    pNumber: document.querySelector(".card-front__card-number") || null,
    pHolder: document.querySelector(".card-front__cardholder-name") || null,
    spanMonth: document.querySelector(".card-front__month") || null,
    spanYear: document.querySelector(".card-front__year") || null,
    pCvc: document.querySelector(".card-back__cvc") || null
}

for (const data in cardDatas) {
    if (cardDatas[data] === null) {
        throw new Error(`Card data element not found: ${data}`);
    }
}

// insert data from form to card real-time
const insertDataInCard = (e) => {

    switch (e.target.id) {
        case "inputCardNumber":
            cardDatas.pNumber.textContent = e.target.value || "0000 0000 0000 0000";
            break;
        case "inputCardHolder":
            cardDatas.pHolder.textContent = e.target.value || "JANE APPLESSED";
            break;
        case "inputExpDateMonth":
            cardDatas.spanMonth.textContent = e.target.value || "00";
            break;
        case "inputExpDateYear":
            cardDatas.spanYear.textContent = e.target.value || "00";
            break;
         case "inputCardCvc":
            cardDatas.pCvc.textContent = e.target.value || "000";
            break;
        default:
    }
}

inputAll.forEach((input) => { input.addEventListener("input", insertDataInCard); });