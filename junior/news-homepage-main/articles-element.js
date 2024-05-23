"use strict";

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export default class ArticlesElement extends LitElement {

    static styles = css`

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .articles {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: repeat(3, 1fr);
            gap: min(6.8vw, 1.6rem) 0;
        }

        .articles__block {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-template-rows: auto;
            column-gap: min(6.4vw, 1.5rem);
            padding-inline-end: min(1.2vw, .3rem);
        }

        .articles__img {
            display: block;
            max-inline-size: 100%;
            block-size: auto;
        }

        .articles__content {
            display: flex;
            flex-direction: column;
            row-gap: min(3.2vw, .75rem);
        }

        .articles__number {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--grayish-blue);
        }

        .articles__title {
            font-size: clamp(1rem, 7.6vw, 1.12rem);
            font-weight: 800;
            color: var(--very-dark-blue);
            cursor: pointer;
        }

        .articles__title:hover { color: var(--soft-red); }

        .articles__text {
            font-size: clamp(.6rem, 3.9vw, .93rem);
            line-height: calc(clamp(.6rem, 3.9vw, .93rem) * 1.5);
            font-weight: 400;
            color: var(--dark-grayish-blue);
        }

        @media only screen and (min-width: 577px) {

            .articles {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: auto;
                gap: 0 min(2vw, 1.6rem);
            }

            .articles__block {
                display: grid;
                grid-template-columns: auto 1fr;
                grid-template-rows: auto;
                column-gap: min(2vw, 1.5rem);
                padding-inline-end: min(.4vw, .3rem);
            }

            .articles__content { row-gap: min(1vw, .75rem) }

            .articles__number { font-size: clamp(.9rem, 2.6vw, 1.8rem); }
            
            .articles__title { font-size: clamp(.7rem, 1.5vw, 1.12rem); }

            .articles__text {
                font-size: clamp(.6rem, 1.3vw, .93rem);
                line-height: calc(clamp(.5rem, 1.3vw, .93rem) * 1.5);
            } 
        }

    `;

    render(){
        return html`
            <div class="articles">
                <div class="articles__block">
                    <div class="articles__wrapper-img">
                        <img class="articles__img" src="./assets/images/image-retro-pcs.jpg" alt="a retro pc" width="100" height="127">
                    </div>
                    <div class="articles__content">
                        <span class="articles__number">01</span>
                        <h4 class="articles__title">Reviving Retro PCs</h4>
                        <p class="articles__text">What happens when old PCs are given modern upgrades?</p>
                    </div>
                </div>
                <div class="articles__block">
                    <div class="articles__wrapper-img">
                        <img class="articles__img" src="./assets/images/image-top-laptops.jpg" alt="keyboard keys" width="100" height="127">
                    </div>
                    <div class="articles__content">
                        <span class="articles__number">02</span>
                        <h4 class="articles__title">Top 10 Laptops of 2022</h4>
                        <p class="articles__text">Our best picks for various needs and budgets.</p>
                    </div>
                </div>
                <div class="articles__block">
                    <div class="articles__wrapper-img">
                        <img class="articles__img" src="./assets/images/image-gaming-growth.jpg" alt="a video game control" width="100" height="127">
                    </div>
                    <div class="articles__content">
                        <span class="articles__number">03</span>
                        <h4 class="articles__title">The Growth of Gaming</h4>
                        <p class="articles__text"> How the pandemic has sparked fresh opportunities.</p>
                    </div>
                </div>
            </div>
        `;
    }
}

/* customElements.define("articles-element", ArticlesElement); */