"use strict";

const mainForm = document.querySelector(".main__form");
const mainInput = document.querySelector(".main__input");
const mainError = document.querySelector(".main__error");

mainInput.addEventListener("input", 
  function() {
    if (mainInput.validity.valid && mainInput.value.length > 0) {
      mainError.innerText = "";
      mainInput.classList.remove("active");
    }
  }
);

mainForm.addEventListener("submit", 
  function(e) {
    if (!mainInput.validity.valid || mainInput.value.length === 0) {
      mainError.innerText = "Please provide a valid email address";
      mainInput.classList.add("active");
      e.preventDefault();
    } else {
      mainError.innerText = "";
    }
  }
);




