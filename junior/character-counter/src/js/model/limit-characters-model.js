// check the limit of characters 
export function checkLimitCharacters(numCharacters, valueLimit) {
    if (valueLimit > 0 && numCharacters >= valueLimit) {
        return true;
    } else {
        return false;
    }
}

