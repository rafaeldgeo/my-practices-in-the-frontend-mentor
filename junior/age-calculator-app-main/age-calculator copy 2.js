"use strict";

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export default class AgeCalculatorElement extends LitElement {

    static properties = {
        error: {status: true},
    }

    static styles = css`
    
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

.calculate { inline-size: 100%; }

.calculate__form { 
    position: relative; 
    margin-block-end: 3rem;
}

.calculate__wrapper-input {
    display: flex;
    column-gap: min(5vw, 1rem);
    padding-block-end: 3.12rem;
    border-bottom: 2px solid var(--light-grey);
    cursor: pointer;
}

.calculate__wrapper-field {
    max-inline-size: 30%;
    max-block-size: calc(12vw + 3rem);
    display: flex;
    flex-direction: column;
    row-gap: .5rem;
}

.calculate__label {
    font-size: clamp(.6rem, 3vw, .93rem);
    font-weight: 700;
    letter-spacing: .2rem; 
    text-transform: uppercase;
    color: var(--smokey-grey);
}

.calculate__label--erro { color: var(--light-red); }

.calculate__input {
    inline-size: 100%;
    border-radius: .5rem;
    border: 1px solid var(--light-grey);
    font-family: var(--font);
    font-size: 1rem;
    font-weight: 700;
    padding: min(4vw, .75rem) min(4vw, 1.37rem); 
    color: var(--off-black);
} 

.calculate__input:focus { outline: 1px solid var(--purple); }

.calculate__input--erro { border-color: var(--light-red); }

::placeholder {
    font-family: var(--font);
    font-size: clamp(0.8rem, 4vw, 1rem);
    font-weight: 700;
    color: var(--smokey-grey);
}

.calculate__error {
    visibility: hidden;
    font-size: clamp(.5rem, 2.5vw, .9rem);
    font-style: italic;
    font-weight: 400;
    color: var(--light-red);
}

.calculate__error--active {
    visibility: visible
}

.calculate__btn {
    max-inline-size: 100%;
    block-size: auto; 
    position: absolute;
    right: 40%;
    top: 80%;
    border: none;
    border-radius: 50%;
    background-color: var(--purple);
    padding: min(1rem, 2vw, 1.56rem);
    cursor: pointer;
}

.calculate__btn:hover { background-color: var(--off-black); }

.result {
    display: flex;
    flex-direction: column;
}

.result__wrapper-output {
    display: flex;
    flex-wrap: nowrap;
    line-height: min(20vw, 7rem);
}

:is(.result__value,
    .resul__label) {
        font-size: clamp(2rem, 15vw, 6.56rem);
        font-weight: 800;
        font-style: italic;
    }

.result__value {
    letter-spacing: none;
    color: var(--purple);
}

.resul__label {
    letter-spacing: none;
    color: var(--off-black);
}

@media only screen and (min-width: 36.06rem) {

    .calculate__wrapper-input {
        column-gap: 1.87rem;
        padding-block-end: 3.12rem;
    }

    .calculate__wrapper-field { 
        max-inline-size: 22%; 
        max-block-size: auto;
    }

    .calculate__label { font-size: .93rem; }

    .calculate__input {
        inline-size: 100%;
        font-size: clamp(1rem, 3vw, 1.93rem);
        padding: .75rem 1.37rem; 
    } 
    
    .calculate__error {
        font-size: clamp(.5rem, 1.5vw, .9rem);
    }
    
    ::placeholder { font-size: clamp(1rem, 3vw, 1.93rem); }

    .calculate__btn {
        right: 0%;
        top: 75%;
    }

    .result__wrapper-output { line-height: min(15vw, 7rem); }

    :is(.result__value,
    .resul__label) {
        font-size: clamp(4rem, 12vw, 6.56rem);
    }

    .result__value { letter-spacing: 1rem; }

    .resul__label { letter-spacing: -.29rem; }

    }
    `;

    constructor() {
        super();
        this.error = "";
    }

    render() {
        return html`
        <div class="calculate">
        <form class="calculate__form" action="#" novalidate>
          <div class="calculate__wrapper-input">
            <div class="calculate__wrapper-field">
              <label class="calculate__label" for="day">Day</label>
              <input class="calculate__input" type="number" inputmode="numeric" placeholder="DD" id="day" name="day" min="1" max="31" required> 
              <span class="calculate__error">Error message</span>
            </div>
            <div class="calculate__wrapper-field">
              <label class="calculate__label" for="month">Month</label>
              <input class="calculate__input" type="number" inputmode="numeric" placeholder="MM" id="month" name="month" min="1" max="12" required>
              <span class="calculate__error">Error message</span>
            </div>
            <div class="calculate__wrapper-field">
              <label class="calculate__label" for="year">Year</label>
             <input class="calculate__input" type="number" inputmode="numeric" placeholder="YYYY" id="year" name="year" min="1582" required>
             <span class="calculate__error">Error message</span>
            </div>
          </div>
          <button class="calculate__btn" type="submit" @click=${this.checkSubmit}>
            <svg class="calculate__btn-icon" xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44"><g fill="none" stroke="#FFF" stroke-width="2"><path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/></g></svg>
          </button>
        </form>
      </div>
      <div class="result">
        <div class="result__wrapper-output">
          <span class="result__value">--</span>
          <span class="resul__label">years</span>
        </div>
        <div class="result__wrapper-output">
          <span class="result__value">--</span>
          <span class="resul__label">months</span>
        </div>
        <div class="result__wrapper-output">
          <span class="result__value">--</span>
          <span class="resul__label">days</span>
        </div>
      </div>
        
    `;
    }

    checkSubmit(e) {
        const DATE = new Date();
        const currentYear = DATE.getFullYear(); 
        const monthsWith30days = /[469]|1{2}/;
        const monthWith29days = 2;
        const inputMonth = Number(this.renderRoot.querySelector("#month").value);
        const inputList = this.renderRoot.querySelectorAll(".calculate__input");
        let teste = null;
        inputList.forEach(input => {
            if (input.value.length === 0) { /* erro para campos vazios */
                input.nextElementSibling.textContent = "This field is required";
                this.formatError(input);
                e.preventDefault();
            } else if (!input.validity.valid) { /* erro para campos com regras no HTML */
                if (input.id === "day") {
                    input.nextElementSibling.textContent =  "Must be a valid day"; 
                } else if (input.id === "month") {
                    input.nextElementSibling.textContent =  "Must be a valid month";
                } else if (input.id === "year") {
                    input.nextElementSibling.textContent =  "Must be a valid year";
                }
                this.formatError(input);
                e.preventDefault(); 
            } else if (input.id === "day") { /* erro para campos mês com 30 dias e fevereiro com 29 dias */
                if (Number(input.value) === 31 && monthsWith30days.test(inputMonth) || (Number(input.value) > 29 && inputMonth === monthWith29days)) {
                    input.nextElementSibling.textContent =  "Must be a valid date"; 
                    this.formatError(input);
                    inputList[1].previousElementSibling.classList.add("calculate__label--erro");
                    teste = false;
                    e.preventDefault(); 
                }
            } else if (input.id === "year" && Number(input.value) > currentYear) { /* erro para ano futuro */
                input.nextElementSibling.textContent =  "Must be in the past";
                this.formatError(input);
                e.preventDefault();
            } else if (teste) { /* passa sem erro */
                input.classList.remove("calculate__input--erro");
                input.nextElementSibling.classList.remove("calculate__error--active");
                input.previousElementSibling.classList.remove("calculate__label--erro");
                input.nextElementSibling.textContent = "";
               /*  this.validDate(e ,input); */
            }
        });
    }

    formatError(input) {
        input.classList.add("calculate__input--erro");
        input.previousElementSibling.classList.add("calculate__label--erro");
        input.nextElementSibling.classList.add("calculate__error--active");
    }
 
   /*  validDate(event, input) {
        const DATE = new Date();
        const day = DATE.getDay();
        const month = DATE.getMonth();
        const year = DATE.getFullYear();
    } */

}

/* customElements.define("age-calculator-element", AgeCalculatorElement); */