"use strict";

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export default class AdviceGenerator extends LitElement {

    static properties = {
        data: {status: true},
        id: {status: true},
        advice: {status: true},
    }

    static styles = css`

    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .advice-box {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: min(4.1vw, 1.5rem);
        max-inline-size: 33.75rem;
        border-radius: 1rem;
        padding: min(8.3vw, 3rem) min(8.3vw, 2.5rem);
        margin: 0.6rem;
        text-align: center;
        box-shadow: 10px 10px 10px 1px var(--dark-blue-shadow); 
        background-color: var(--dark-grayish-blue);
    }

    .advice-box__number {
        font-size: clamp(.6rem, 2.2vw, .8rem);
        text-transform: uppercase;
        letter-spacing: .28rem;
        font-weight: 800;
        color: var(--neon-green);
    }

    .advice-box__text {
        color: var(--light-cyan);
        font-size: clamp(1rem, 4.7vw, 1.7rem);
    }

    .advice-box__pattern-divider { 
        max-inline-size: 100%;
        block-size: auto;
        padding-block: 1rem; 
    }

    .advice-box__btn {
        position: absolute;
        top: calc(88% + .1rem);
        background-color: var(--neon-green);
        padding: min(3.7vw, 1.18rem) min(3.4vw, 1.25rem);
        border-radius: 5rem;
        border: none;
        cursor: pointer;
    }

    .advice-box__btn-img {
        max-inline-size: 100%;
        block-size: auto;
    }

    .advice-box__btn:hover { box-shadow: 1px 1px 25px 1px var(--neon-green-shadow); }

    @media only screen and (min-width: 36.06rem) {

        .advice-box {
            row-gap: 1.5rem;
            padding: 3rem 2.5rem;
        }

        .advice-box__number { font-size: .8rem; }

        .advice-box__text { font-size: 1.7rem; }

        .advice-box__btn { 
            top: 90%;
            padding: 1.18rem 1.25rem; 
        }

    } `;

    constructor() {
        super();
        this.id = "117";
        this.advice = "It is easy to sit up and take notice, what's difficult is getting up and taking action."
    }

    render() {
        return html `
        <div class="advice-box">
            <h2 class="advice-box__number">Advice  #${this.id}</h2>
            <p class="advice-box__text">&ldquo;${this.advice}&rdquo;</p>
            <picture>
                <source media="(max-width: 576px)" srcset="./images/pattern-divider-mobile.svg">
                <source media="(min-width: 577px)" srcset="./images/pattern-divider-desktop.svg">
                <img class="advice-box__pattern-divider" src="./images/pattern-divider-mobile.svg" alt="">
            </picture>
            <button class="advice-box__btn" type="button" aria-label="get advice" @click="${this._getAdvice}">
                <img class="advice-box__btn-img" src="./images/icon-dice.svg" alt="get advice" width="24" height="24">
            </button>
        </div>
        `;
    }

    _getAdvice(){
        fetch("https://api.adviceslip.com/advice")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network reponse was not ok");
            }
            return response.json();
        })
        .then(data => {
            this.data = data;          
            this.id = data.slip.id;
            this.advice = data.slip.advice;
        })
        .catch(error => { 
            console.error("Erro:", error);
            this.advice = "Sorry, We had a problem!";
        });
    }

}

/* customElements.define("advice-element", AdviceGenerator); */

