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

// define countdown
const diffMillis = releaseDate.getTime() - dateNow.getTime();

const seconds = Math.floor(diffMillis / 100);
const minutes = Math.floor(seconds / 60);
const hours = Math.floor(minutes / 60);
const days = Math.floor(hours / 24);

// rest for hours, minutes and seconds
const hoursRest = hours % 24;
const minutesRest = minutes % 60;
const secondsRest = seconds % 60;

console.log(days);
console.log(hoursRest);
console.log(minutesRest);
console.log(secondsRest);
