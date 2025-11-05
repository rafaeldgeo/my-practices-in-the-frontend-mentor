"use strict";

const accordionSummaries = document.querySelectorAll(".faq__accordion-summary");

if (accordionSummaries.length === 0) {
  throw new Error ("Don't found element summary. Accordion cannot initialize.");
}

// listen to tag summary
accordionSummaries.forEach((summary) => {
  summary.addEventListener("click", closeOpenedDetails);
});

// function close all details allow only one opened
function closeOpenedDetails() {
  accordionSummaries.forEach((summary) => {
    let detail = summary.parentNode; // catch the element father, tag details
    if (detail !== this.parentNode) { // this.parentNode is the detail clicked
      detail.removeAttribute("open");
    }
  });
}


