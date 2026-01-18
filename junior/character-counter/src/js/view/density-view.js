
const divResult = document.querySelector(".density__result");
const spanMsgNoCharacters = document.querySelector(".density__no-characters"); ''
const btnSeeCharts = document.querySelector(".density__btn");
const btnArrow = document.querySelector(".density__btn-arrow");
const btnMsgExpend = document.querySelector(".density__btn-expand");
const list = document.createElement("ul");
list.classList.add("chart");

// create de list of charts
export function displayCharts(filter) {
    let result = "";

    for (const chart of filter) {
        result +=
            `<li class="chart__item">
                <span class="chart__title" id="letter-${chart.letter}">${chart.letter.toUpperCase()}</span>
                <div class="chart__bar">
                    <div class="chart__progress-bar"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-valuenow="${chart.percentage}"
                        aria-labelledby="letter-${chart.letter}"
                        style="--progress: ${chart.percentage}%;">
                    </div>
                </div>
                <span class="chart__result">
                    <span class="chart__value">${chart.count}</span>
                    <span class="chart__percent">(${chart.percentage}%)</span>
                </span>
            </li>`
    }
    list.innerHTML = result;
    divResult.prepend(list)
}

// update the messagem "No characters in textaArea" and show the button more or less
export function updateDensityUI(hasFilter) {
    spanMsgNoCharacters.classList.toggle("density__no-characters--hidden", hasFilter);
    btnSeeCharts.classList.toggle("density__btn--show", hasFilter);
}

// change the type of the button more or less
export function changeTypeBtn(typeFilter) {
    if (typeFilter === "all") {
        btnMsgExpend.textContent = " more";
        btnArrow.classList.remove("density__btn-arrow--up");
        btnSeeCharts.ariaExpanded = "true";
    } else {
        btnMsgExpend.textContent = " less";
        btnArrow.classList.add("density__btn-arrow--up");
        btnSeeCharts.ariaExpanded = "false";
    }
}