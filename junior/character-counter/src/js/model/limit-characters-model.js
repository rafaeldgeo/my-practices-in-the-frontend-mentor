// check the limit of characters 
export function checkLimitCharacters(numCharacters, valueLimit) {
    if (valueLimit > 0 && numCharacters >= valueLimit) {
        return { isExceed: true, limitDefined: valueLimit };
    } else {
        return { isExceed: false, limitDefined: valueLimit };
    }
}

