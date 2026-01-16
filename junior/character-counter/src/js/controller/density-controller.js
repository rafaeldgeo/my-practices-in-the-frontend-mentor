import { appState } from "../store/appState.js";
import { displayCharts } from "../view/density-view.js";
const btnDisplayResult = document.querySelector(".density__btn");

export function handleResultDensity(density) {
    let typOfResult = appState.displayDensityResult;
    if (density.length > 0) {
        displayCharts(sortByNumberOfLetters(density), typOfResult);
    }
}

//sort by larger number of letter
function sortByNumberOfLetters(density) {
    const copyResultNumberOfLetters = [...density];
    const sorted = copyResultNumberOfLetters.sort((a, b) => {
        return b.count - a.count;
    });
    return sorted;
}

function defineTypeOfResult() {
    const typOfResult = appState.displayDensityResult;
    appState.displayDensityResult = typOfResult === "top5" ? "all" : "top5";
}

btnDisplayResult.addEventListener("click", defineTypeOfResult);