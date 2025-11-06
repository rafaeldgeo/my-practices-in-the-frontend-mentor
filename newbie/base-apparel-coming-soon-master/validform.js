"use strict"

const gridForm = document.querySelector(".grid__form");
const gridInputEmail = document.querySelector(".grid__input-email");
const gridError = document.querySelector(".grid__error");

if (!gridForm || !gridInputEmail || !gridError) {
   throw new Error("Form elements not found in DOM");
}

// listen the input and check if it is valid
gridInputEmail.addEventListener(
  "input",
  function () {
    if (gridInputEmail.validity.valid) {
      gridError.textContent = "";
    }
  }
);

// listen the form, if form submit not valid, set de error and don't allow to sent
gridForm.addEventListener (
  "submit",
  function (e) {
    if (!gridInputEmail.validity.valid || gridInputEmail.value.length === 0) {
     gridError.textContent = "Please provide a valid email";
     e.preventDefault(); 
    }
  }
);

