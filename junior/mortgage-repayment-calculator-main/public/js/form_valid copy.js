const inputAmount = document.getElementById("amount");
const inputRate = document.getElementById("rate");
const inputs = document.querySelectorAll(".form__input");
const form = document.querySelector(".form");

// check if the inputs are empty
const checkEmptyInputs = function (e) {
    const divFields = form.querySelectorAll(".form__field");
    divFields.forEach((divFormField) => {
        const input = divFormField.querySelector(".form__input");
        const divInputContainer = divFormField.querySelector(".form__input-container");
        const spanLabelSecondary = divFormField.querySelector(".form__label-secondary");
        const spanError = divFormField.querySelector(".form__msg-erro");
        if (!input || !spanError || !spanLabelSecondary || !divInputContainer) {
            console.warn("There's some problem with elements of the classes .form__input, .form__input-container, .form__label-secondary, .form__msg-erro");
            return;
        };
        if (input.value.trim() === "") {
            divInputContainer.classList.add("form__input-container--error");
            divInputContainer.classList.remove("form__input-container--hover");
            spanLabelSecondary.classList.add("form__label-secondary--error");
            spanError.classList.add("form__msg-erro--show");
            input.ariaInvalid = "true";
            e.preventDefault();
        } else {
            divInputContainer.classList.remove("form__input-container--error");
            divInputContainer.classList.add("form__input-container--hover");
            spanLabelSecondary.classList.remove("form__label-secondary--error");
            spanError.classList.remove("form__msg-erro--show");
            input.ariaInvalid = "false";
        }
    });
}

form.addEventListener("submit", checkEmptyInputs);


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

// shows formated number from input id="amount" 000.000
inputAmount.addEventListener("blur", inputFormatAmount);

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

// shows formated number from input id="rate" 0.00
inputRate.addEventListener("blur", inputFormatRate);

