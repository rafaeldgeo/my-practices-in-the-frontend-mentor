const checkboxExcludeSpaces = document.querySelector("#exclude-spaces");
const checkboxLimitCharacters = document.querySelector("#limit-caracters");

// check if exclude spaces checkbox is checked
export function checkActivatedExcludeSpace(){
    return checkboxExcludeSpaces.checked;
}

// check if limit characters checkbox is checked
export function checkActivatedInputLimit() {
    return checkboxLimitCharacters.checked;
}
