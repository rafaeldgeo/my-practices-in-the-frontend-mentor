import {checkEmptyInputs} from "./form_style.js";

const form = document.querySelector(".form");

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

    console.log(data);
}

// listen submit buttom 
form.addEventListener("submit", submitForm);



