const formInput = document.querySelectorAll(".form__input-container");
const form = document.querySelector(".form");

// const focusInput = function (e) {
//     const formInputContainer = e.target.parentElement;
//     const labelSecondary = formInputContainer.querySelector(".form__label-secondary");
//     const backgroundColor = getComputedStyle(labelSecondary)["background-color"];
//     if (backgroundColor === "rgb(227, 243, 253)") {
//         formInputContainer.style.borderColor = "hsl(61, 70%, 52%)";
//         labelSecondary.style.backgroundColor = "hsl(61, 70%, 52%)";
//         labelSecondary.style.color = "hsl(202, 55%, 16%)";
//     } else {
//         formInputContainer.style.borderColor = "hsl(200, 24%, 40%)";
//         labelSecondary.style.backgroundColor = "hsl(202, 86%, 94%)";
//         labelSecondary.style.color = "hsl(200, 24%, 40%)";
//     }
// }

const focusInput = function(e) {
    const formInputContainer = e.target.parentElement;
    const labelSecondary = formInputContainer.querySelector(".form__label-secondary");
    const isFocus = formInputContainer.getAttribute
}

form.addEventListener("focusin", focusInput);
form.addEventListener("focusout", focusInput);




// formInput.forEach((input) => {
//     input.addEventListener("focusin", (event) => {
//         console.log(event.target.parentElement);
//     })
// })


