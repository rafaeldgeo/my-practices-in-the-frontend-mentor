"use strict";

const accordionSummaries = document.querySelectorAll(".faq__accordion-summary");

accordionSummaries.forEach((summary) => {
  summary.addEventListener("click", closeOpenedDetails);
});

function closeOpenedDetails() {

  accordionSummaries.forEach((summary) => {
    let detail = summary.parentNode;
    if (detail != this.parentNode) {
      detail.removeAttribute("open");
    }
  });
}


