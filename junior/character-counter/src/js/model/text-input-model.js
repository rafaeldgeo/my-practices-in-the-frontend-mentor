// check if input characters exceed limit
export function checkLimitTextInput(text, limitCharacters) {
    const totalCharacters = text.length;
    if (totalCharacters > limitCharacters) {
        return false;
    } else {
        return true;
    }
}