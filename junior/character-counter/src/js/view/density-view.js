const spanMsgNoCharacters = document.querySelector(".density__no-characters");
const listCharts = document.querySelector(".chart");
const btnSeeResult = document.querySelector(".density__btn");

console.log(btnSeeResult.getAttribute("aria-expanded"));

// btnSeeResult.addEventListener("click", updateApp);

export function displayTop5Charts(top5List) {
    let result;
    if (!top5List) {
        result = ""
        listCharts.innerHTML = result;
        return;
    };
    
    top5List.forEach(chat => {
        result += 
        `<li class="chart__item">
            <span class="chart__title" id="letter-${chat.letter}">${chat.letter.toUpperCase()}</span>
            <div class="chart__bar">
                <div class="chart__progress-bar"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow="16.06"
                    aria-labelledby="letter-e"
                </div>
            </div>
            <span class="chart__result">
                <span class="chart__value">${chat.count}</span>
                <span class="chart__percent">${chat.percentage}%</span>
            </span>
        </li>\n`
    });
    listCharts.innerHTML = result;
    // console.log(result);
}
