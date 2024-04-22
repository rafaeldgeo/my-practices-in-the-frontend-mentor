"use strict";

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export default class AgeCalculatorElement extends LitElement {

    static properties = {
        errorMessageDay: {status: true},
        errorStyleLabelDay: {status: true},
        errorStyleInputDay: {status: true},
        errorStyleMessageDay: {status: true},
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
        this.errorMessageDay = "Error Message";
        this.errorStyleLabelDay = "";
        this.errorStyleInputDay = "";
        this.errorStyleMessageDay = "";
        
    }

    render() {
        return html`
        <div class="calculate">
        <form class="calculate__form" action="#" novalidate>
          <div class="calculate__wrapper-input">
            <div class="calculate__wrapper-field">
              <label class="calculate__label ${this.errorStyleLabelDay}" for="day">Day</label>
              <input class="calculate__input ${this.errorStyleInputDay}" type="number" inputmode="numeric" placeholder="DD" id="day" name="day" min="1" max="31" @change=${this._checkDate} required> 
              <span class="calculate__error ${this.errorStyleMessageDay}">${this.errorMessageDay}</span>
            </div>
            <div class="calculate__wrapper-field">
              <label class="calculate__label ${this.errorLabelStyle}" for="month">Month</label>
              <input class="calculate__input" type="number" inputmode="numeric" placeholder="MM" id="month" name="month" min="1" max="12" required>
              <span class="calculate__error">Error message</span>
            </div>
            <div class="calculate__wrapper-field">
              <label class="calculate__label ${this.errorLabelStyle}" for="year">Year</label>
             <input class="calculate__input" type="number" inputmode="numeric" placeholder="YYYY" id="year" name="year" min="1582" required>
             <span class="calculate__error">Error message</span>
            </div>
          </div>
          <button class="calculate__btn" type="submit" @click=${this._submitDate}>
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

    _checkDate(){
        const day = this.renderRoot.querySelector("#day");
        if (!this._checkValidity(day)) {
            this.errorMessageDay = "Must be a valid day";
            this.errorStyleLabelDay = "calculate__label--erro";
            this.errorStyleInputDay = "calculate__input--erro";
            this.errorStyleMessageDay = "calculate__error--active";
            return false;
        } else {
            this.errorStyleLabelDay = "";
            this.errorStyleInputDay = "";
            this.errorStyleMessageDay = "";
            return true;
        }
    }

    _checkValidity(input){
        if (input.validity.valid) {
            return true;
        }
    }

    _submitDate(e){
        if (!this._checkDate()) {
            e.preventDefault(); 
        }
    }

}

/* customElements.define("age-calculator-element", AgeCalculatorElement); */