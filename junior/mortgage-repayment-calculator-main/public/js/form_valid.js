import { checkEmptyInputs } from "./form_style.js"

const form = document.querySelector(".form");
const inputs = document.querySelectorAll(".form__input");
const inputAmount = document.getElementById("amount");
const inputRate = document.getElementById("rate");

// sanitize inputs because I'm using type="text" in input
inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
        let valueInputed = e.target.value;
        // clear inputs, only number, dot or comma
        switch (e.target.id) {
            case "amount":
                valueInputed = valueInputed.replace(/[^\d,\.]/g, "");
                break;
            case "term":
                valueInputed = valueInputed.replace(/[^\d]/g, "");
                break;
            case "rate":
                valueInputed = valueInputed.replace(/[^\d\.]/g, "");
                break;
            default:
        }
        e.target.value = valueInputed;
    }
    );
});

// format of the input from input id="amount"
const inputFormatAmount = function (e) {
    const defineFormatAmount = new Intl.NumberFormat("pt-BR", {
        style: "decimal",
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
    });

    let valueInputed = e.target.value;
    valueInputed = valueInputed.replace(/[^\d,\.]/g, "");

    valueInputed = valueInputed.replace(",", ".");
    let number = parseFloat(valueInputed);

    if (!isNaN(number)) {
        e.target.value = defineFormatAmount.format(number);
    } else {
        e.target.value = "";
    }
}

// format of the input from input id="rate"
const inputFormatRate = function (e) {
    
    let valueInputed = e.target.value;
    valueInputed = valueInputed.replace(/[^\d\.]/g, "");

    let number = parseFloat(valueInputed);

    if (!isNaN(number)) {
        e.target.value = number.toFixed(2);
    } else {
        e.target.value = "";
    }
}

// shows formated number from input id="amount" 000.000
inputAmount.addEventListener("blur", inputFormatAmount);

// shows formated number from input id="rate" 0.00
inputRate.addEventListener("blur", inputFormatRate);

// sent the form
form.addEventListener("submit", checkEmptyInputs);
