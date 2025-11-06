"use strict";

const btnGrades = document.querySelectorAll(".card-rate__note-input");
const ratingSection = document.querySelector(".card-rate");
const btnSubmit = document.querySelector(".card-rate__submit-btn");
const spanGrade = document.querySelector(".card-thanks__note");
const thanksSection = document.querySelector(".card-thanks");

if (btnGrades.length === 0 || !ratingSection || !btnSubmit || !spanGrade || !thanksSection) {
  throw new Error("Some component not found!");
}

// select the button and capture the grade 
function selectGrade(e) {
  const btnSelected = e.target;
  const grade = btnSelected.value;

  for (let btn of btnGrades) {
    btn.classList.remove("card-rate__note-input--selected");
  }

  btnSelected.classList.add("card-rate__note-input--selected");
  spanGrade.textContent = grade;
}

// hide rating and show success message
function showThanks() {
  ratingSection.style.display = "none";
  thanksSection.style.display = "block";
}

btnGrades.forEach(btn => {
  btn.addEventListener("click", selectGrade);
});

btnSubmit.addEventListener("click", showThanks);
