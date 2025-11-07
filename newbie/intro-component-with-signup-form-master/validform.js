"use strict";

const clainForm = document.querySelector(".clain__form");
const clainInputs = document.querySelectorAll(".clain__input");
let hasError = false;

if (!clainForm) {
  throw new Error("Form not found");
}

if (clainInputs.length === 0) {
  throw new Error("Inputs not found");
}

// check if all inputs are valid
clainForm.addEventListener("input",
  function () {
    for (let i = 0; i < clainInputs.length; i++) {
      if (clainInputs[i].validity.valid || clainInputs[i].value.length > 0) {
        hasError = false;
        clainInputs[i].removeAttribute("required");
        clainInputs[i].nextElementSibling.style.display = "none";
      }
    }
  }
);

// check if all inputs are valid and set erro
clainForm.addEventListener("submit",
  function (e) {
    for (let i = 0; i < clainInputs.length; i++) {
      if (!clainInputs[i].validity.valid || clainInputs[i].value.length == 0) {
        hasError = true;
        clainInputs[i].setAttribute("required", "required");
        clainInputs[i].nextElementSibling.style.display = "block";
      }
    }
    if (hasError) {
      e.preventDefault();
    }
  }
);

