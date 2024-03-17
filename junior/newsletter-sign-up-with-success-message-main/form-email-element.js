"use strict";

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export default class FormEmailElement extends LitElement {


    static styles = css`

    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .newsletter__header-form {
        display: flex;
        justify-content: space-between;
        margin-block-end: min(1.5vw, 0.65rem);
    }

    .newsletter__header-form {
        font-size: clamp(0.6rem, 1.5vw, 0.75rem);
        font-weight: 700;
    }

    .newsletter__erro { color: var(--tomato); } 

    .newsletter__input-email {
        width: 100%;
        border-radius: 0.5rem;
        padding: min(3vw, 1.5rem) min(3vw, 1.5rem);
        font-family: var(--font);
        font-size: clamp(0.7rem, 4.3vw, 1rem);
        border: 1px solid var(--grey);
        margin-block-end: min(1.5vw, 1.5rem);
    }

    ::placeholder {
        color: var(--grey);
        font-size: clamp(0.7rem, 4.3vw, 1rem);
    }

    .newsletter__input-email:focus {
        outline: 1px solid var(--dark-slate-grey);
    }

    .newsletter__btn-send {
        border: none;
        border-radius: 0.5rem;
        width: 100%;
        padding: min(3vw, 1.5rem) min(3vw, 1.5rem);
        font-family: var(--font);
        font-size: clamp(0.7rem, 4.3vw, 1rem);
        font-weight: 700;
        color: var(--white);
        background-color: var(--dark-slate-grey);
        cursor: pointer;
    }

    .newsletter__btn-send:hover {
        background-image: linear-gradient(90deg, var(--gadiente-color1), var(--gradient-color2));
        box-shadow: 1px 8px 20px 5px var(--shadow-btn);
    }

    @media only screen and (min-width: 36.06rem) {

        .newsletter__header-form { margin-block-end: min(1.5vw, 0.65rem); }
    
        .newsletter__header-form { font-size: clamp(0.6rem, 1.5vw, 0.75rem); }

        .newsletter__input-email {
            padding: min(2vw, 1.12rem) min(1.5vw, 1.5rem);
            font-size: clamp(0.7rem, 1.5vw, 1rem);
            margin-block-end: min(1.5vw, 1.5rem);
        }
    
        ::placeholder { font-size: clamp(0.7rem, 1.5vw, 1rem); }

        .newsletter__btn-send {
            padding: min(2.5vw, 1.12rem) min(2.5vw, 1.5rem);
            font-size: clamp(0.7rem, 1.5vw, 1rem);
        }
    }
    `;

    constructor() {
        super();
    }

    render() {
        return html`
         <form class="newsletter__form" action="thanks.html" novalidate>
            <div class="newsletter__header-form">
              <label class="newsletter__input-label" for="email">Email address</label>
              <span class="newsletter__erro">Valid email required</span>
            </div>
            <input class="newsletter__input-email" type="email" name="email" id="email" placeholder="email@company.com">
            <input class="newsletter__btn-send" type="submit" value="Subscribe to monthly newsletter">
          </form> 
        `;
    }
}

customElements.define("form-email-element", FormEmailElement);