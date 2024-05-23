"use strict";

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export default class MenuElement extends LitElement {

    static properties = {
        listOfLinks: {},
        logo: {},
        showMenuMobile: {state: true},
        showModal: {state: true},
    }


    static styles = css`

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :host {
            display: flex;
            align-items: center;
        }

        .header__mobile-menu {
            position: fixed;
            display: none;
            padding: min(8.5vw, 2rem) min(6.4vw, 1.5rem);
            width: 65vw;
            height: 100%;
            right: 0;
            top: 0; 
            z-index: 2;
            background-color: var(--off-white);
        }

        .header__mobile-menu--show { display: block; }

        .header__desktop-menu { display: none; }

        .header__menu-item {
            display: block;
            margin-inline-start: 0; 
            margin-block-end: min(5.1vw, 1.2rem);
        }

        .header__menu-link {
            font-size: clamp(.8rem, 4.6vw, 1.1rem);
            font-weight: 400;
            color: var(--very-dark-blue);
            text-decoration: none;
            cursor: pointer;
        }

        .header__menu-link:hover { color: var(--soft-red); }

        .header__img-logo {
            max-inline-size: 100%;
            block-size: auto;
        }

        .header__btn-menu {
            margin-inline-start: auto;
            background-color: transparent;
            border: none;
        }

        .header__wrapper-btn-close-menu {
            display: flex;
            justify-content: end;
            margin-block-end: min(26vw, 6.25rem);
        }

        .header__btn-close-menu {
            background-color: transparent;
            border: none;
        }

        .header__modal {
            display: block;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: var(--modal);
        } 

        @media only screen and (min-width: 577px) { 

            .header__desktop-menu { 
               margin-inline-start: auto;
               display: block; 
            }

            .header__mobile-menu { display: none; }

            .header__menu-item {
                display: inline-block;
                margin-inline-start: min(8.9vw, 2.1rem);
                margin-block-end: 0;
            }

            .header__menu-link { font-size: clamp(.8rem, 1.4vw, 1rem); }

            .header__btn-menu { display: none; }

            .header__modal { display: none; }
        }

    `;

    constructor(){
        super();
        this.listOfLinks = ["Home", "New", "Popular", "Trending", "Categories"];
        this.logo = "https://fakeimg.pl/65x40"
        this.showMenuMobile = false;
        this.showModal = false;
    }


    render(){
        return html`
            <img class="header__img-logo" src=${this.logo} alt="logo" width="65" height="40">
            <nav class="header__desktop-menu">
                ${this._createList()}
            </nav>
            <button class="header__btn-menu" type="button" aria-label="open menu" @click=${this._toogleMenuMobile}>
                <svg width="40" height="17" xmlns="http://www.w3.org/2000/svg"><g fill="#00001A" fill-rule="evenodd"><path d="M0 0h40v3H0zM0 7h40v3H0zM0 14h40v3H0z"/><path d="M0 0h40v3H0z"/></g></svg>
            </button> 
            <nav class="header__mobile-menu ${this.showMenuMobile ? "header__mobile-menu--show" : ""}">
                <div class="header__wrapper-btn-close-menu">
                    <button class="header__btn-close-menu" type="button" aria-label="close menu" @click=${this._toogleMenuMobile}>
                        <svg width="32" height="31" xmlns="http://www.w3.org/2000/svg"><g   fill="#00001A" fill-rule="evenodd"><path d="m2.919.297 28.284 28.284-2.122 2.122L.797 2.419z"/><path d="M.797 28.581 29.081.297l2.122 2.122L2.919 30.703z"/></g></svg>
                    </button>
                </div>
                ${this._createList()}
            </nav> 
            <div class="${this.showModal ? "header__modal": ""}"></div>
        `;
    }

    _createList(){
        return html`
          <ul class="header__menu-list">
            ${this.listOfLinks.map((item, index) => html`
                <li class="header__menu-item">
                    <a class=" header__menu-link" href="#">${item}</a>
                </li>
            `)}
          </ul>
        `;
    }

    _toogleMenuMobile(){
        this.showMenuMobile = !this.showMenuMobile;
        this.showModal = !this.showModal;
    }
}

/* 
customElements.define("menu-element", MenuElement); */