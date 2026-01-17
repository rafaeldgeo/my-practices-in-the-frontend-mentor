import { appState } from "../store/appState.js";
import { displayCharts } from "../view/density-view.js";
import { sortByNumberOfLetters } from "../model/density-model.js";
const btnDisplayResult = document.querySelector(".density__btn");

// handle the result and call render
export function handleResultDensity(density) {
    appState.displayDensityResult.descendingOrder = sortByNumberOfLetters(density);
    applyDensityFilter();
}

// define the type of filter to view
function defineTypeOfFilter() {
    const typOfResult = appState.displayDensityResult.modeVisualize;
    appState.displayDensityResult.modeVisualize = typOfResult === "top5" ? "all" : "top5";
    applyDensityFilter();
}

// appy the filter and call render
function applyDensityFilter() {
    const densitySorted = appState.displayDensityResult.descendingOrder;
    const valueFilter = appState.displayDensityResult.modeVisualize === "top5" ? 5 : densitySorted.length;
    const filter = densitySorted.slice(0, valueFilter);
    displayCharts(filter);
}

btnDisplayResult.addEventListener("click", defineTypeOfFilter);