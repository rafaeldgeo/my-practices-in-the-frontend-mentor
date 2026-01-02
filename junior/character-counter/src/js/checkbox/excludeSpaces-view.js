const checkboxExcludeSpaces = document.querySelector("#exclude-spaces");

// check if exclude spaces checkbox is checked
export function checkActivatedExcludeSpace(){
    return checkboxExcludeSpaces.checked;
}