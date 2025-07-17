"use strict";
import { checkInputs } from "./form_valid.js";

const form = document.querySelector(".form");
if (!form) throw new Error("Form not found");

form.addEventListener("submit", (e) => {
    let hasError = checkInputs();
    if (hasError) {
        e.preventDefault();
        return; 
    } 
     e.preventDefault();
});


