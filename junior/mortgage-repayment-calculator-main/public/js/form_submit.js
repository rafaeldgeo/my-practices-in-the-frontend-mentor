import {checkEmptyInputs} from "./form_style.js";

const form = document.querySelector(".form");
const divResult = document.querySelector(".results");

const submitForm = async function(e) {
    e.preventDefault();

    if (checkEmptyInputs()) {
        return;  // don't sent, because there's error
    }
    
    const formData = new FormData(form);
    const data = {
        amount: parseFloat(formData.get("amount")),
        term: parseInt(formData.get("term")),
        rate: parseFloat(formData.get("rate")),
        type: formData.get("type")
    };

    try {
        const response = await fetch("/calculate", {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });

        const html = await response.text();
        divResult.innerHTML = html;

    } catch (error) {
        console.error("ERRO to calculate Mortage", error);
    }
}

// listen submit buttom 
form.addEventListener("submit", submitForm);



