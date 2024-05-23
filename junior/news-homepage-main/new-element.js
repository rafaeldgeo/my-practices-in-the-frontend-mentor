"use strict";

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export default class NewElement extends LitElement {

    static styles = css`

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .new__title {
            font-size: clamp(1.5rem, 10.6vw, 2.5rem);
            margin-block-end: min(7.6vw, 1.8rem); 
            color: var(--soft-orange);
        }

        .new__subtitle {
            font-size: clamp(1rem, 5.3vw, 1.25rem);
            margin-block-end: min(2.6vw, .62rem);
            color: var(--off-white);
        }

        .new__text {
            font-size: clamp(.6rem, 4vw, .95rem);
            line-height: calc(clamp(.6rem, 4vw, .95rem) * 1.5);
            color: var(--grayish-blue);
        }

        hr {
            margin-block-start: min(8.9vw, 2.1rem);
            margin-block-end: min(6.4vw, 1.5rem);
        }
 
        @media only screen and (min-width: 577px) {
            
            .new__title {
                font-size: clamp(1rem, 3.6vw, 2.5rem);
                margin-block-end: min(2.6vw, 1.8rem); 
            }

            .new__subtitle {
                font-size: clamp(.8rem, 1.8vw, 1.25rem);
                margin-block-end: min(.9vw, .62rem);
            }

            .new__text {
                font-size: clamp(.6rem, 1.4vw, .95rem);
                line-height: calc(clamp(.6rem, 1.3vw, .95rem) * 1.5);
            }

            hr {
                margin-block-start: min(3vw, 2.1rem);
                margin-block-end: min(2vw, 1.5rem);
            }
            
        }

    `;

    render(){
        return html`
            <h2 class="new__title">New</h2>
            <h3 class="new__subtitle">Hydrogen VS Electric Cars</h3>
            <p class="new__text">Will hydrogen-fueled cars ever catch up to EVs?</p>
            <hr>
            <h3 class="new__subtitle">The Downsides of AI Artistry</h3>
            <p class="new__text">What are the possible adverse effects of on-demand AI image generation?</p>
            <hr>
            <h3 class="new__subtitle">Is VC Funding Drying Up?</h3>
            <p class="new__text">Private funding by VC firms is down 50% YOY. We take a look at what that means.</p>
        `;
    }
}

/* customElements.define("new-element", NewElement); */