// check the limit of characters 
export function checkLimitCharacters(numCharacters, valueLimit) {



    valueLimit = Number(valueLimit);
    let limitDefined = valueLimit > 0 ? valueLimit : undefined;
    if (!limitDefined || numCharacters < limitDefined) {
        return false;
    } else {
        return true;
    }
}

// Get the value of the input limit
// function handleStatesInputLimit() {
//     updateCharactersStats();
// }

// check the limit of characters 
export function checkLimitCharacters(numCharacters, valueLimit) {
    let limitDefined = valueLimit > 0 ? valueLimit : undefined;
    if (!limitDefined || numCharacters < limitDefined) {
        return { isExceed: false, value: limitDefined };
    } else {
        return { isExceed: true, value: limitDefined };
    }
}

