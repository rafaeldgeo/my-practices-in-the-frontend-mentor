"use strict";

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

const DATE = new Date();
const currentYear = Number(DATE.getFullYear());
const currentMonth = Number(DATE.getMonth()) + 1;
const currentDate = Number(DATE.getDate());

export default class AgeCalculatorElement extends LitElement {

    static properties = {
        days: {status: true},
        errorMessageDay: {status: true},
        errorStyleLabelDay: {status: true},
        errorStyleFocusDay: {status: true},
        errorShowMessageDay: {status: true},  
        months: {status: true},
        errorMessageMonth: {status: true},
        errorStyleLabelMonth: {status: true},
        errorStyleFocusMonth: {status: true},
        errorShowMessageMonth: {status: true},  
        years: {status: true},
        errorMessageYear: {status: true},
        errorStyleLabelYear: {status: true},
        errorStyleFocusYear: {status: true},
        errorShowMessageYear: {status: true},
        teste: {status: true}
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
        this.days = "--";
        this.errorMessageDay = "Message Error";
        this.errorStyleLabelDay = false;
        this.errorStyleFocusDay = false;
        this.errorShowMessageDay = false;
        this.months = "--",
        this.errorMessageMonth = "Message Error";
        this.errorStyleLabelMonth = false;
        this.errorStyleFocusMonth = false;
        this.errorShowMessageMonth = false;  
        this.years = "--",
        this.errorMessageYear = "Message Error";
        this.errorStyleLabelYear = false;
        this.errorStyleFocusYear = false;
        this.errorShowMessageYear = false;
    }

    render() {
        return html`
        <div class="calculate">
        <form class="calculate__form" action="#" novalidate>
          <div class="calculate__wrapper-input">
            <div class="calculate__wrapper-field">
              <label class="calculate__label ${this.errorStyleLabelDay ? "calculate__label--erro" : ""}"  for="day">Day</label>
              <input class="calculate__input ${this.errorStyleFocusDay ? "calculate__input--erro" : ""}" type="number" inputmode="numeric" placeholder="DD" id="day" name="day" min="1" max="31" @change=${this._checkDay} required> 
              <span class="calculate__error ${this.errorShowMessageDay ? "calculate__error--active": ""}">${this.errorMessageDay}</span>
            </div>
            <div class="calculate__wrapper-field">
              <label class="calculate__label ${this.errorStyleLabelMonth ? "calculate__label--erro" : ""}" for="month">Month</label>
              <input class="calculate__input ${this.errorStyleFocusMonth ? "calculate__input--erro" : ""}" type="number" inputmode="numeric" placeholder="MM" id="month" name="month" min="1" max="12"  @change=${this._checkMonth} required>
              <span class="calculate__error ${this.errorShowMessageMonth ? "calculate__error--active": ""}">${this.errorMessageMonth}</span>
            </div>
            <div class="calculate__wrapper-field">
              <label class="calculate__label ${this.errorStyleLabelYear ? "calculate__label--erro" : ""}" for="year">Year</label>
             <input class="calculate__input ${this.errorStyleFocusYear ? "calculate__input--erro" : ""}" type="number" inputmode="numeric" placeholder="YYYY" id="year" name="year" min="1582" @change=${this._checkYear} required>
             <span class="calculate__error ${this.errorShowMessageYear ? "calculate__error--active": ""}">${this.errorMessageYear}</span>
            </div>
          </div>
          <button class="calculate__btn" type="submit" @click=${this._submitDate} aria-label="submit">
            <svg class="calculate__btn-icon" xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44"><g fill="none" stroke="#FFF" stroke-width="2"><path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/></g></svg>
          </button>
        </form>
      </div>
      <div class="result">
        <div class="result__wrapper-output">
          <span class="result__value">${this.years}</span>
          <span class="resul__label">years</span>
        </div>
        <div class="result__wrapper-output">
          <span class="result__value">${this.months}</span>
          <span class="resul__label">months</span>
        </div>
        <div class="result__wrapper-output">
          <span class="result__value">${this.days}</span>
          <span class="resul__label">days</span>
        </div>
      </div>
        
    `;
    }

    _defineTypeError(error) {
        const typeError = {
            standard: "Message Error", 
            empetyfield: "This field is required",
            invalidday: "Must be a valid day",
            invalidmonth: "Must be a valid month",
            invalidyear: "Must be a valid year",
            invalidyearfuture: "Must be in the past",
            invaliddate: "Must be a valid date",
        };
        return typeError[error];
    }

    _checkValidity(input){
        if (input.value.length === 0) {
            return "empetyfield";
        } else if (!input.validity.valid) {
            if (input.id === "day") {
                return "invalidday"; 
            } else if (input.id === "month") {
                return "invalidmonth"
            } else if (input.id === "year") {
                return "invalidyear"; }
        } else {
            return "standard";
        }
    }

    _checkDay(){
        const day = this.renderRoot.querySelector("#day");
        let typeError = this._checkValidity(day);
        let isValid = true;
        if (typeError === "empetyfield" || typeError === "invalidday") {
            this.errorMessageDay = this._defineTypeError(typeError);
            isValid = false;
        } 
        this._ErrorFormat("day", isValid);
        return isValid;
    }

    _checkMonth() {
        const month = this.renderRoot.querySelector("#month");
        const day = this.renderRoot.querySelector("#day");
        let typeError = this._checkValidity(month);
        let isValid = true;
        if (typeError === "empetyfield" || typeError === "invalidmonth") {
            this.errorMessageMonth = this._defineTypeError(typeError);
            isValid = false;
        }
        this._ErrorFormat("month", isValid);
        return isValid;
    }

    _checkYear(){
        const year = this.renderRoot.querySelector("#year");
        const DATE = new Date();
        const currentYear = DATE.getFullYear(); 
        let typeError = this._checkValidity(year);
        let isValid = true;
        if (typeError === "empetyfield" || typeError === "invalidyear") {
            this.errorMessageYear = this._defineTypeError(typeError);
            isValid = false;
        } else if (year.value > currentYear) {
            this.errorMessageYear = this._defineTypeError("invalidyearfuture");
            isValid = false;
        }
        this._ErrorFormat("year", isValid);
        return isValid;
    }

    _ErrorFormat(inputType, isValid){
        if (inputType === "day") {
            this.errorStyleLabelDay = isValid ? false : true;
            this.errorStyleFocusDay = isValid ? false : true;
            this.errorShowMessageDay = isValid ? false : true; 
        } else if (inputType === "month") {
            this.errorStyleLabelMonth = isValid ? false : true;
            this.errorStyleFocusMonth = isValid ? false : true;
            this.errorShowMessageMonth = isValid ? false : true; 
        } else if (inputType === "year") {
            this.errorStyleLabelYear = isValid ? false : true;
            this.errorStyleFocusYear = isValid ? false : true;
            this.errorShowMessageYear = isValid ? false : true; 
        }
    }

    _submitDate(e){
        let checkDay = this._checkDay();
        let checkMonth = this._checkMonth();
        let checkYear = this._checkYear();
        if (!checkDay || !checkMonth || !checkYear) {
            e.preventDefault();
        } else {
            this._checkDate(); 
        }
        e.preventDefault();
    }

    _checkDate(){
        const year = this.renderRoot.querySelector("#year").value;
        const month = Number(this.renderRoot.querySelector("#month").value);
        const day = Number(this.renderRoot.querySelector("#day").value);
        const MONTH30DAYS = /[469]|1{2}/;
        const FEBRURARY = 2;        
        let leapYear = year.slice(2,4);
        let isLeapYear = false;
        let isValid = true;
        if (leapYear !== "00" && Number(year) % 4 === 0) {
            isLeapYear = true;
        } else if (leapYear === "00" && Number(year) % 400 === 0) {
            isLeapYear = true;
        } else {
            isLeapYear = false;
        }
        if (day === 31 && MONTH30DAYS.test(month) || day > 28 && month === FEBRURARY && !isLeapYear || day > 29 && month === FEBRURARY && isLeapYear) {
            this.errorMessageDay = this._defineTypeError("invaliddate");
            isValid = false;
        } else {
           this._calcDate(day, month, Number(year)); 
        }
        this._ErrorFormat("day", isValid);  
    } 

    _calcDate(inputDay, inputMonth, inputYear) {
        this.years = currentYear - inputYear;
        this.months = currentMonth - inputMonth;
        this.days = currentDate - inputDay;
        if (this.months < 0) {
            --this.years;
            this.months = (this.months - 1) + 12;
        }
        if (this.days < 0) {
            this.days = this.days + 30;
        }
    }


}

/* customElements.define("age-calculator-element", AgeCalculatorElement); */