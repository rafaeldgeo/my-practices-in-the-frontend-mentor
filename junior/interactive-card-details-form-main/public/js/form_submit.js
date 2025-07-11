"use strict";
import { checkEmptyInput } from "./form_style.js";

const form = document.querySelector(".form");
if (!form) throw new Error("Form not found");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkEmptyInput();
});


