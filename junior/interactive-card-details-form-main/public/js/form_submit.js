"use strict";

import { checkInputs } from "./form_valid.js";

const form = document.querySelector(".form");
if (!form) throw new Error("Form not found");

form.addEventListener("submit", (e) => {
    let formHasErrors = checkInputs();
    if (formHasErrors) {
        e.preventDefault();
        return; 
    } 
     e.preventDefault();
});


