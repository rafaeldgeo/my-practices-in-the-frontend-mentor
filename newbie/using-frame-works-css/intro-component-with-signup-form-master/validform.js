"use strict";

const clainForm = document.querySelector(".clain__form");
const clainInput = document.querySelectorAll(".clain__input");

clainForm.addEventListener("input", 
  function() {
    for (let i = 0; i < clainInput.length; i++) {
      if (clainInput[i].validity.valid || clainInput[i].value.length > 0) {
        clainInput[i].removeAttribute("required");
        clainInput[i].nextElementSibling.style.display = "none";
      }
    }    
  }
);

clainForm.addEventListener("submit",
   function(e) {
     for (let i = 0; i < clainInput.length; i++) {
       if (!clainInput[i].validity.valid || clainInput[i].value.length == 0) {
         clainInput[i].setAttribute("required", "required");
         clainInput[i].nextElementSibling.style.display = "block";
       }
     }
     e.preventDefault(); 
   }      
);