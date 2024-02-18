"use strict";

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';


export default class CardTime extends LitElement {

    static properties = {
        activity: {},
        icon: {},
    }

    static styles = css`  

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :host {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            background-image: url("./images/icon-work.svg");
            background-repeat: no-repeat;
            background-position: top -12px right 16px;
            background-size: auto;
            border-radius: 1rem;
            background-color: var(--light-orange);
            font-family: var(--font);
        }

        .card__info:hover {
            background-color: var(--light-blue);
            cursor: pointer;
        }

        .card__info {
            display: flex;
            flex-direction: column;
            border-radius: 0.9rem;
            background-color: var(--dark-blue);
            /* padding: min(3vw, 1.75rem) min(3vw, 1.87rem); */
            padding: 1.75rem min(3vw, 1.87rem);
        }

        .card__header {  
            display: flex;
            justify-content: space-between;
            align-items: center;
            align-items: center;
            margin-bottom: min(1vw, 0.75rem);
        }

        .card__title, .card__current {
            color: var(--white);
        }

        .card__icon { 
            fill: var(--pale-blue); 
            cursor: pointer;
        }

        .card__icon:hover { fill: var(--white); }

        .card__title {
            font-size: clamp(0.8rem, 2vw, 1.18rem);
            font-weight: 500;
        }

        .card__current {
            margin: min(1vw, 0.65rem) 0 min(1vw, 0.5rem) 0; 
            font-size: clamp(1rem, 6vw, 3.5rem);
            font-weight: 300;
        }

        .card__previous {
            margin-bottom: min(0.5vw, 0.3rem);
            font-size: clamp(0.6rem, 1.6vw, 0.95rem);
            color: var(--pale-blue);
        }

    

    `;

    constructor() {
        super();
    }

    render() {
        return html `
          <div class="card__info">
            <div class="card__header">
                <h3 class="card__title">Work</h3>
                <svg class="card__icon" viewBox="0 0 21 5" width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill-rule="evenodd"/></svg>
            </div>
            <span class="card__current">32hrs</span>    
            <span class="card__previous">Last Week - 36hrs</span>
          </div>


            
        `;
    }
}

/* customElements.define("cardtime-element", CardTime); */