"use strict";

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export default class MenuElement extends LitElement {

    static properties = {
        listOfLinks: {},
        logo: {},
    }

    static styles = css`

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      /*  border: 1px solid tomato;   */  
      }

      .header__nav {
        padding: min(6vw, 3.1rem) min(3vw, 3.1rem);
        position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

      .header__desktop { display: none; }

      .header__mobile {
        padding: min(3vw, 0.5rem);
        position: relative;
        display: block;
        cursor: pointer;
      }

      .header__icon-hamburger {
        display: block;
        max-inline-size: 120%; 
        block-size: auto;
      }

      .header__title {
        display: flex;
        align-items: center;
      }

      .header__logo {
        max-inline-size: 80%; 
        block-size: auto;
      }

      .header__drop-down {
        position: absolute;
        display: block;
        padding: min(15vw, 3rem) min(10vw, 2.1rem);
        width: 92vw;
        height: auto;
        right: 4%;
        top: calc(11% + 1.5rem); 
        z-index: 1;
        background-color: var(--white);
      }

      .header__drop-down::before {
        content: "";
        position: absolute;
        bottom: 100%;
        right: 0%;
        margin-left: -12px;
        border-width: min(5vw, 0.8rem);
        border-style: solid;
        border-color: transparent var(--white) var(--white) transparent;
      }

      .header__list {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        text-align: center;
        gap: min(11vw, 3rem) 0;
      }

      .header__link {
        font-family: var(--font-body);
        font-size: clamp(0.6rem, 6vw, 1.2rem);
        text-decoration: none;
        color: var(--dark-grayish-blue);
        cursor: pointer;
      }

      .header__link--4 {
        padding: min(4vw, 1.2rem) min(5vw, 1.8rem);
        border-radius: 2rem;
        font-size: clamp(0.6rem, 5vw, 1.2rem);
        font-family: var(--font-title);
        text-transform: uppercase;
        color: var(--very-dark-desaturated-blue);
        background-color: var(--yellow);
      }

      @media only screen and (min-width: 577px) {

        .header__nav { padding: min(4vw, 3.1rem) min(3vw, 3.1rem); }

        .header__desktop { display: block; }

        .header__mobile { display: none; }

        .header__drop-down { display: none; }

        .header__logo { max-inline-size: 120%; }
       
        .header__list { 
          display: flex; 
          flex-direction: row;
          gap: 0 min(3vw, 3.1rem);
        }

        .header__link {
          font-size: clamp(1rem, 2vw, 1.3rem);
          color: var(--white);
        }

        .header__link--4 {
        padding: min(1.5vw, 1.2rem) min(1.5vw, 1.8rem);
        border-radius: 2rem;
        font-size: clamp(1rem, 2vw, 1.3rem);
        color: var(--very-dark-desaturated-blue);
        background-color: var(--white);
      }

      .header__link--4:hover {
        color: var(--white);
        background-color: var(--white-opacity);
      }
    `;

    constructor() {
        super();
        this.listOfLinks = ["About", "Services", "Projects", "Contact"];
        this.logo = "./images/logo.svg";
    }

    render() {
        return html`
          <nav class="header__nav">
            <h1 class="header__title">
                <img class="header__logo" src="${this.logo ?? nothing}" alt="logo sunnyside" width="186" height="36">
            </h1>
            <div class="header__desktop">
                ${this.createList()}
            </div>
            <div class="header__mobile">
                <img class="header__icon-hamburger" src="./images/icon-hamburger.svg" alt="menu" width="24" height="18">
            </div>
          </nav>
          <div class="header__drop-down">
            ${this.createList()}
          </div>
        `;
    }

    createList() {
        return html`
         <ul class="header__list">
                ${this.listOfLinks.map((item, index) => html`
                  <li class="header__item-list">
                    <a class="header__link header__link--${index+1}" href="#">${item}</a>
                  </li>
                `)}
            </ul>
        `;
    }
}

/* customElements.define("menu-element",MenuElement); */