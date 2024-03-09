"use strict";

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

const btnPeriod = document.querySelectorAll(".btn-period");

export default class CardTime extends LitElement {

    static properties = {
        data: {type: Array},
    }

    static styles = css`  

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .container {
            display: grid;
            grid-template-columns: minmax(min-content, 330px);
            grid-template-rows: repeat(6, minmax(max-content, 10rem));
            gap: 1.6rem 0;
        }

        .card {
            padding-top: 45px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            background-image: none;
            background-repeat: no-repeat;
            background-position: top -5px right 16px;
            background-size: auto;
            border-radius: 1rem;
            background-color: var(--pale-blue);
            font-family: var(--font);
        }

        .card--work {
            background-image: url("./images/icon-work.svg");
            background-color: var(--light-orange);
        }

        .card--play {
            background-image: url("./images/icon-play.svg");
            background-color: var(--soft-blue);
        }

        .card--study {
            background-image: url("./images/icon-study.svg");
            background-color: var(--light-red);
        }

        .card--exercise {
            background-image: url("./images/icon-exercise.svg");
            background-color: var(--lime-green);
        }

        .card--social {
            background-image: url("./images/icon-social.svg");
            background-color: var(--violet);
        }

        .card--self-care {
            background-image: url("./images/icon-self-care.svg");
            background-color: var(--soft-yellow);
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
            padding: min(11vw, 2rem) min(11vw, 1.5rem);
        }

        .card__header {  
            display: flex;
            justify-content: space-between;
            align-items: center;
            align-items: center;
            margin-bottom: min(1vw, 0.2rem);
        }

        .card__body {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
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
            font-size: clamp(0.8rem, 4vw, 1.18rem); 
            font-weight: 500;
        }

        .card__current {
            margin: 0;
            font-size: clamp(1.4rem, 10vw, 1.8rem);
            font-weight: 300;
        }

        .card__previous {
           margin-bottom: 0; 
           font-size: 1rem;
           color: var(--pale-blue);
        }

        @media only screen and (min-width: 36.06rem) {

            .container {
                grid-template-columns: repeat(3, minmax(8rem, 15.9rem));
                grid-template-rows: repeat(2, minmax(max-content, 6.25rem));
                gap: min(3.25vw, 1.87rem);
            }

            .card__info { padding: 1.75rem min(3vw, 1.87rem); }

            .card__header { margin-bottom: min(1vw, 0.75rem); }

            .card__body { 
                flex-direction: column; 
                justify-content: none;
                align-items: flex-start;
            }

            .card__title { font-size: clamp(0.8rem, 2vw, 1.18rem); }

            .card__current {
                margin: min(1vw, 0.65rem) 0 min(1vw, 0.5rem) 0; 
                font-size: clamp(1rem, 6vw, 3.5rem);
            }

            .card__previous {
                margin-bottom: min(0.5vw, 0.3rem);
                font-size: clamp(0.6rem, 1.6vw, 0.95rem);
            }
        }
    `;

    constructor() {
        super();
        this.data = [];
        fetch("data.json")
        .then(response => response.json())
        .then(data => {
            this.data = data;
        });
     }

    render() {
        return html `
        <div class="container">
            ${this.data.map((activity) => 
                html`
                <div class="card ${this.defineStyle(activity.title)}">
                    <div class="card__info">
                        <div class="card__header">
                            <h3 class="card__title">${activity.title}</h3>
                            <svg class="card__icon" viewBox="0 0 21 5" width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill-rule="evenodd"/></svg>
                        </div>
                        <div class="card__body">
                            <span class="card__current"><span class="card__current-value">${activity.timeframes.weekly.current}</span>hrs</span>    
                            <span class="card__previous">Last Week <span class="card__previous-value">${activity.timeframes.weekly.previous}</span>hrs</span>
                        </div>
                    </div> 
            </div>`
            )}
        </div>
        `;
    }

    defineStyle(activity) {
        return `card--${activity.replace(" ","-").toLowerCase()}`
    }
   
    defineHours(period, getElement, time) {
        let card = this.renderRoot.querySelectorAll(getElement); 
        card.forEach((item, index) => {
         if (period === "weekly") {
             item.innerText = this.data[index].timeframes[period][time];
         } else if (period === "daily") {
            item.innerText = this.data[index].timeframes[period][time];
         } else if (period === "monthly") {
            item.innerText = this.data[index].timeframes[period][time];
         }
        });  
    }

    connectedCallback() {
        super.connectedCallback();
        let period = "";
        btnPeriod.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                period = e.target.textContent.toLocaleLowerCase();
                this.defineHours(period, ".card__current-value", "current");
                this.defineHours(period, ".card__previous-value", "previous");
        });
    }); 
   }
}

/* customElements.define("cardtime-element", CardTime); */