"use strict";

const btnPeriod = document.querySelectorAll(".btn-period");

btnPeriod.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        btnPeriod.forEach(btn => btn.classList.remove("btn-period--selected"));
        e.target.classList.add("btn-period--selected");
    })
}); 
