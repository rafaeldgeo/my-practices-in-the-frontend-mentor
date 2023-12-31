"use strict";

class AdvantageCard extends HTMLElement {

  static get observedAttributes() {
    return ["data-title", "data-description", "data-image"];
  }

  constructor() {
    super();
  }

  connectedCallback() {

    const shadow = this.attachShadow({ mode: "open" });

    const card = document.createElement("div");
    card.classList.add("card");

    const cardContentWrapper = document.createElement("div");
    cardContentWrapper.classList.add("card__content-wrapper");
    const imageSide = this.getAttribute("data-image-side");
    let rightSide = "";
    let leftSide = "";
    if (imageSide === "right") {
      rightSide = "image";
      leftSide = "text";
    } else if (imageSide === "left") {
      rightSide = "text";
      leftSide = "image";
    }
      
    const cardTextWrapper = document.createElement("div");
    cardTextWrapper.classList.add("card__text-wrappe");

    const cardTitle = document.createElement("h2");
    cardTitle.classList.add("card__title");
    cardTitle.textContent = this.getAttribute("data-title");

    const cardDescription = document.createElement("p");
    cardDescription.classList.add("card__description");
    cardDescription.textContent = this.getAttribute("data-description");

    const cardIllustrationWrapper = document.createElement("div");
    cardIllustrationWrapper.classList.add("card__image-wrapper");

    const cardImage = document.createElement("img");
    cardImage.classList.add("card__image");
    cardImage.setAttribute("alt", "");
    cardImage.setAttribute("width", "1000");
    cardImage.setAttribute("height", "800");
    cardImage.src = this.getAttribute("data-image");

    const style = document.createElement("style");
    style.textContent = `

    .card {
      display: grid;
      grid-template-columns: minmax(min-content, 500px);
      grid-template-rows: repeat(2, min-content);
      grid-template-areas: 
      "image"
      "text";
      gap: min(6vw, 5rem) 0; 
      border-radius: 15px;
      margin: 0 min(8vw, 7rem) 0 min(8vw, 7rem); 
      padding: min(10vw, 3.5rem);  
      box-shadow: 0 0 8px 1px var(--shadow-box);
    }

    .card__content-wrapper {
      grid-area: text;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .card__title {
      text-align: center;
      font-family: var(--font-headings);
      font-size: clamp(0.8rem, 6vw, 1.2rem);
      color: var(--very-dark-cyan);
    }

    .card__description {
      margin: 15px 0;
      text-align: center;
      font-family: var(--font-body);
      font-size: clamp(0.6rem, 3vw, 1.1rem);
      line-height: calc(clamp(0.6rem, 3vw, 1.1rem) * 1.5);
      color: var(--grayish-blue);
    }

    .card__image-wrapper {
      grid-area: image;
    }

    .card__image {
      object-fit: contain;
      width: 100%;
      height: auto;  
    }

    @media only screen and (min-width: 576px) {

    .card {
      grid-template-columns: repeat(2, minmax(min-content, 500px));
      grid-template-rows: min-content;
      grid-template-areas: 
      "${leftSide} ${rightSide}";
      gap: 0 min(6vw, 5rem); 
      padding: min(3vw, 2.5rem) min(3vw, 2.5rem) min(3vw, 2.5rem) min(7vw, 6.25rem);  
    }

    .card__title {
      text-align: left;
      font-size: clamp(0.8rem, 2.5vw, 2rem);
    }

    .card__description {
      text-align: left;
      font-size: clamp(0.6rem, 2vw, 1.1rem);
      line-height: calc(clamp(0.6rem, 2vw, 1.1rem) * 1.5);
    }
    
    }
    `;

    shadow.appendChild(style);
    shadow.appendChild(card);
    card.appendChild(cardContentWrapper); 
    card.appendChild(cardIllustrationWrapper);
    cardContentWrapper.appendChild(cardTextWrapper);
    cardTextWrapper.appendChild(cardTitle);
    cardTextWrapper.appendChild(cardDescription);
    cardIllustrationWrapper.appendChild(cardImage);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    } else {
      this[name] = newValue;
    }
  }
}

customElements.define("advantage-card", AdvantageCard);

