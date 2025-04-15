"use strict";

const dateNow = new Date();
const releaseDate = new Date();
releaseDate.setDate(dateNow.getDate() + 30);

// define date of coming
const day = releaseDate.getDay();
const monthNum = releaseDate.getMonth();
const ListMonth = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const fullDate = `${releaseDate.getDay()} ${ListMonth[monthNum]} ${releaseDate.getFullYear()}`;

const timeCounterTitleEmphasis = document.querySelector(".time-counter__title-emphasis");
timeCounterTitleEmphasis.textContent = fullDate;

//define countdown

const countDownDays = document.querySelector("#days");
const countDownHours = document.querySelector("#hours");
const countDownMin = document.querySelector("#min");
const countDownSec = document.querySelector("#sec");

function updateCountDown() {

    const dateNow = new Date();
    const diffMillis = releaseDate.getTime() - dateNow.getTime();

    const TotalSeconds = Math.floor(diffMillis / 1000);
    const days = Math.floor(TotalSeconds / (60 * 60 * 24));
    const hours = Math.floor((TotalSeconds % (60 * 60 * 24)) / (60 * 60));
    const min = Math.floor((TotalSeconds % (60 * 60)) / 60);
    const sec = Math.floor(TotalSeconds % 60);

    countDownDays.textContent = String(days).padStart(2, "0");
    countDownHours.textContent = String(hours).padStart(2, "0");
    countDownMin.textContent = String(min).padStart(2, "0");
    countDownSec.textContent = String(sec).padStart(2, "0");
}

const countdownInterval = setInterval(updateCountDown, 1000);



