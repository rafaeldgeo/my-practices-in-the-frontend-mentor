document.addEventListener("DOMContentLoaded", function () {

    const countDownDays = document.querySelector("#days");
    const countDownHours = document.querySelector("#hours");
    const countDownMin = document.querySelector("#min");
    const countDownSec = document.querySelector("#sec");

    // define localStorage
    let releaseDate;
    const savedDate = localStorage.getItem("releaseDate");

    // save date
    if (savedDate) {
        releaseDate = new Date(savedDate);
    } else {
        const dateNow = new Date();
        releaseDate = new Date(dateNow);
        releaseDate.setDate(releaseDate.getDate() + 30);
        localStorage.setItem("releaseDate", releaseDate.toISOString());
    }

    // define date of coming
    function defineReleaseDateTitle(releaseDate) {
        const monthNum = releaseDate.getMonth();
        const ListMonth = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
        const fullDate = `${releaseDate.getDate()} ${ListMonth[monthNum]} ${releaseDate.getFullYear()}`;
        const timeCounterTitleEmphasis = document.querySelector(".time-counter__title-emphasis");
        timeCounterTitleEmphasis.textContent = fullDate;
    }

    defineReleaseDateTitle(releaseDate);

    //define countdown
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

    setInterval(updateCountDown, 1000);
    updateCountDown();
});






