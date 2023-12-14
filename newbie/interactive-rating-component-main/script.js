"use strict";

document.querySelector(".card-rate__submit-btn").addEventListener("click", showThanks);
document.querySelector(".card-rate__grades").addEventListener("click", selectGrade);

function showThanks() {
  const ratingSection = document.querySelector(".card-rate");
  const thanksSection = document.querySelector(".card-thanks");
  ratingSection.style.display = "none";
  thanksSection.style.display = "block";
}

function selectGrade(){
  const listInput = document.querySelectorAll(".card-rate__note-input");
  const spanGrade = document.querySelector(".card-thanks__note");
  const inputSelected = event.target;
  const grade = inputSelected.value;
  
  for (let input of listInput) {
    input.classList.remove("card-rate__note-input--selected");  
  }
  
  if (inputSelected.tagName == "INPUT") {
    inputSelected.classList.add("card-rate__note-input--selected");
    spanGrade.innerText = grade;
  }

}
