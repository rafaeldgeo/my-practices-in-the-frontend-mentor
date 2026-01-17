
const divResult = document.querySelector(".density__result");
const list = document.createElement("ul");
list.classList.add("chart");

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
                </div>
            </div>
            <span class="chart__result">
                <span class="chart__value">${chart.count}</span>
                <span class="chart__percent">${chart.percentage}%</span>
            </span>
        </li>`
    }

    list.innerHTML = result;
    divResult.prepend(list)
}

