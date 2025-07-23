"use strict";

import { checkInputs } from "./form_valid.js";

const form = document.querySelector(".form");
if (!form) throw new Error("Form not found");

const divCustomerDatas = document.querySelector(".customer-datas")
if (!divCustomerDatas) throw new Error("Element Customer-Data not found");

const submitForm = async function (e) {
    e.preventDefault();

    if (checkInputs()) {
        return; // don't sent, because there's error in inputs
    }

    // get values from form
    const formData = new FormData(form);
    const data = {
        cardholder: formData.get("cardholder"),
        cardnumber: formData.get("cardnumber"),
        expmonth: parseInt(formData.get("expmonth")),
        expyear: parseInt(formData.get("expyear")),
        cardcvc: parseInt(formData.get("cardcvc"))
    };

    try {
        const response = await fetch("/customerdata", { // send data to siteController.js and await reponse
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)  // convert data object to text
        });

        const html = await response.text(); // receive response text from siteController.js
        divCustomerDatas.innerHTML = html;  // insert in HTML the div confirm with message ok!

        const btnContinue = document.querySelector("#btn-continue");
        btnContinue.addEventListener("click", () => {
            window.location.reload(); // reload page 
        })

    } catch (error) {
        console.error("ERROR to sent customer-data", error);
    }
}

form.addEventListener("submit", submitForm);


