const amount = document.getElementById("amount");
const rate = document.getElementById("rate");
const inputs = document.querySelectorAll(".form__input");

// sanitize inputs because I'm using type="text" in input
inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
        let valueInputed = e.target.value;
        // clear inputs, only number
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
const formatAmount = new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
});

// shows formated number from input id="amount"
amount.addEventListener("blur", (e) => {
    let valueInputed = e.target.value;
    valueInputed = valueInputed.replace(/[^\d,\.]/g, "");

    valueInputed = valueInputed.replace(",", ".");
    let number = parseFloat(valueInputed);

    if (!isNaN(number)) {
        console.log(e.target.value = formatAmount.format(number));
        
    } else {
        e.target.value = "";
    }
});

// format of the input from input id="rate"
const formatRate = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
})

// shows formated number from input id="rate"
rate.addEventListener("blur", (e) => {
    let valueInputed = e.target.value;
    valueInputed = valueInputed.replace(/[^\d\.]/g, "");

    let number = parseFloat(valueInputed);

    if (!isNaN(number)) {
        e.target.value = formatRate.format(number);
    } else {
        e.target.value = "";
    }
});

