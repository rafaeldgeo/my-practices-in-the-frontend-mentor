"use strict";
import { checkEmptyInput } from "./form_style.js";

const form = document.querySelector(".form");
if (!form) throw new Error("Form not found");

form.addEventListener("submit", (e) => {
    let hasError = checkEmptyInput();
    if (hasError) {
        e.preventDefault();
    }
});


