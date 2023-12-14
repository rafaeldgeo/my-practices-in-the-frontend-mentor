"use strict"

const gridForm = document.querySelector(".grid__form");
const gridInputEmail = document.querySelector(".grid__input-email");
const gridError = document.querySelector(".grid__error");

gridInputEmail.addEventListener(
  "input",
  function () {
    if (gridInputEmail.validity.valid) {
      gridError.innerHTML = "";
    }
  }
);

gridForm.addEventListener (
  "submit",
  function (event) {
    if (!gridInputEmail.validity.valid || gridInputEmail.value.length === 0) {
     gridError.innerHTML = "Please provide a valid email";
     event.preventDefault(); 
    }
  }
);

