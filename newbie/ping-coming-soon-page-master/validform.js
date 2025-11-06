"use strict";

const mainForm = document.querySelector(".main__form");
const mainInput = document.querySelector(".main__input");
const mainError = document.querySelector(".main__error");

if (!mainForm || !mainInput || !mainError) {
  console.warn("elements form, input or spanError not found");
}

// listen the input and check if it was fill and email valid
mainInput.addEventListener("input", 
  function() {
    if (mainInput.validity.valid && mainInput.value.length > 0) { //validity property check the real state of the input (Standard HTML)
      mainError.innerText = "";
      mainInput.classList.remove("active"); 
    }
  }
);

// listen the submit and check if it was fill and email valid
mainForm.addEventListener("submit", 
  function(e) {
    if (!mainInput.validity.valid || mainInput.value.length === 0) { 
      mainError.innerText = "Please provide a valid email address";
      mainInput.classList.add("active"); 
      e.preventDefault(); // don't allow to sent the form
    } else {
      mainError.innerText = "";
    }
  }
);




