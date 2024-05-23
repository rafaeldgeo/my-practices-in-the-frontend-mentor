"use strict";

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export default class HeadlineElement extends LitElement {


    static styles = css`

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        .headline__img-main {
            max-inline-size: 100%;
            block-size: auto;
        }

        .headline__wrapper-content {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: repeat(2, auto);
            grid-template-areas: 
            "title" 
            "introduction";
            align-items: center;
            padding-block-start: min(7.9vw, 1.87rem);
            color: var(--very-dark-blue);
        }

        .headline__wrapper-title { grid-area: "title"; }

        .headline__title {
            font-size: clamp(1.5rem, 11.9vw, 2.8rem);
            font-weight: 800;
            line-height: calc(clamp(1.5rem, 11.9vw, 2.8rem) * 1);
            letter-spacing: .1rem;
            margin-block-end: min(4.2vw, 1rem);
        }

        .headline__wrapper-introduction {
            grid-template-areas: "introduction";
            padding-inline: min(2.9vw, .7rem);
        }

        .headline__introduction {
            font-size: clamp(.6rem, 4vw, .9rem);
            line-height: calc(clamp(.6rem, 4vw, .9rem) * 1.5);
        }

        .headline__btn {
            margin-top: min(8.9vw, 2.1rem);
            border: none;
            text-transform: uppercase;
            font-size: clamp(.6rem, 3.4vw, .8rem);
            font-weight: 800;
            letter-spacing: .3rem;
            padding: min(4.6vw, 1.1rem) min(7.6vw, 1.8rem);
            background-color: var(--soft-red);
            color: var(--off-white);
            cursor: pointer;
        }

        .headline__btn:hover { background-color: var(--very-dark-blue); }

        @media only screen and (min-width: 577px) {


            .headline__wrapper-content {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-template-rows: auto;
                grid-template-areas: "title introduction";
                padding-block-start: min(2.7vw, 1.87rem);
            }

            .headline__title {
                font-size: clamp(1.5rem, 4.9vw, 3.4rem);
                line-height: calc(clamp(1.5rem, 4.9vw, 3.4rem) * 1);
                margin-block-end: 0;
            }

            .headline__wrapper-introduction {
                grid-template-areas: "introduction";
                padding-inline: min(1vw, .7rem);
            }

            .headline__introduction {
                font-size: clamp(.6rem, 1.5vw, .95rem);
                line-height: calc(clamp(.6rem, 2vw, .95rem) * 1.5);
            }

            .headline__btn {
                margin-top: min(3vw, 2.1rem);
                font-size: clamp(.6rem, 1.1vw, .8rem);
                padding: min(1.6vw, 1.1rem) min(2.6vw, 1.8rem);
            }
        }

    `;

    render(){
        return html`
        <picture>
            <source media="(max-width: 576px )" srcset="./assets/images/image-web-3-mobile.jpg">
            <source media="(min-width: 577px )" srcset="./assets/images/image-web-3-desktop.jpg">
            <img class="headline__img-main" src="./assets/images/image-web-3-mobile.jpg" alt="">
      </picture>
      <div class="headline__wrapper-content">
        <div class="headline__wrapper-title">
          <h1 class="headline__title">The Bright Future of Web 3.0?</h1>
        </div>
        <div class="headline__wrapper-introduction">
          <p class="headline__introduction">We dive into the next evolution of the web that claims to put the power of the platforms back into the hands of the people.
            But is it really fulfilling its promise?
          </p>
          <button class="headline__btn" type="button">Read more</button>
        </div>
      </div>
        `;
    }
}

/* customElements.define("headline-element", HeadlineElement); */