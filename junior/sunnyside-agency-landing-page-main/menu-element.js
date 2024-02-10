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
       /*  border: 1px solid tomato; */   
      }

      .header__nav {
        padding: min(4vw, 3.1rem) min(3vw, 3.1rem);
        position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

      .header__title {
        display: flex;
        align-items: center;
      }

      .header__logo {
        max-inline-size: 120%; 
        block-size: auto;
      }

      .header__list {
        list-style-type: none;
        display: flex;
        column-gap: min(3vw, 3.1rem);
      }

      .header__link {
        font-family: var(--font-body);
        font-size: clamp(1rem, 2vw, 1.3rem);
        text-decoration: none;
        color: var(--white);
        cursor: pointer;
      }

      .header__link--4 {
        padding: min(1.5vw, 1.2rem) min(1.5vw, 1.8rem);
        border-radius: 2rem;
        font-size: clamp(1rem, 2vw, 1.3rem);
        font-family: var(--font-title);
        text-transform: uppercase;
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
            <ul class="header__list">
                ${this.listOfLinks.map((item, index) => html`
                  <li class="header__item-list">
                    <a class="header__link header__link--${index+1}" href="#">${item}</a>
                  </li>
                `)}
            </ul>
          </nav>
        `;
    }
}

/* customElements.define("menu-element",MenuElement); */