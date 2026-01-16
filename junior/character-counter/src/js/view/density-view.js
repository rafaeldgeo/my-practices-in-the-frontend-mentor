
const divResult = document.querySelector(".density__result");

const list = document.createElement("ul");
list.classList.add("chart");


export function displayCharts(densitySorted, typOfResult) {
    let result = "";

    const top5 = densitySorted.filter(function (result, place) {
        return place < 5;
    });

    const numberOfChartToShow = typOfResult === "top5" ? top5 : densitySorted;   
    
    for (const chart of numberOfChartToShow) {
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


// export function generetTop5Result(densityResult) {
//     const resultSorted = sortByNumberOfLetters(densityResult);
//     const top5 = resultSorted.filter(function (result, place) {
//         return place < 5;
//     });
//     return top5;
// }

