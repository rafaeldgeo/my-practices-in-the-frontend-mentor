"use strict";

export default class AdvantageCard extends HTMLElement {

  static get observedAttributes() {
    return ["title", "description", "image-url", "image-side"];
  }

  constructor() {
    super();
    this.title = "Define a title";
    this.description = "Define a description";
    this.imageUrl = "https://fakeimg.pl/1000x800";
    this.imageSide = "left";
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (attributeName === "title") {
      this.title = newValue;
    } else if (attributeName === "description") {
      this.description = newValue;
    } else if (attributeName === "image-url") {
      this.imageUrl = newValue;
    } else if (attributeName === "image-side") {
      this.imageSide = newValue;
    }
  }

  connectedCallback() {

    const shadowRoot = this.attachShadow({ mode: "open" });

    const divCard = this.createElementDom("div", "card");
    const divCardContentWrapper = this.createElementDom("div", "card__content-wrapper");
    const divCardTextWrapper = this.createElementDom("div","card__text-wrappe");
    const h2CardTitle = this.createElementDom("h2","card__title");
    h2CardTitle.innerText = this.title;
    const pCardDescription = this.createElementDom("p","card__description");
    pCardDescription.innerText = this.description;

    const divCardIllustrationWrapper = this.createElementDom("div","card__image-wrapper");

    const imgCardImage = this.createElementDom("img","card__image");
    imgCardImage.setAttribute("alt", "");
    imgCardImage.setAttribute("width", "1000");
    imgCardImage.setAttribute("height", "800");
    imgCardImage.src = this.imageUrl;

    const imageSide = this.imageSide;
    let rightSide = "";
    let leftSide = "";
    if (imageSide === "right") {
      rightSide = "image";
      leftSide = "text";
    } else if (imageSide === "left" || imageSide != "left") {
      rightSide = "text";
      leftSide = "image";
    }

    const style = this.createElementDom("style", null);

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
    
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(divCard);
    divCard.appendChild(divCardContentWrapper); 
    divCard.appendChild(divCardIllustrationWrapper);
    divCardContentWrapper.appendChild(divCardTextWrapper);
    divCardTextWrapper.appendChild(h2CardTitle);
    divCardTextWrapper.appendChild(pCardDescription);
    divCardIllustrationWrapper.appendChild(imgCardImage);
  }

  set title(newValue) {
    this._title = newValue;
    if (!this.shadowRoot) {
      return;
    }

    const element = this.shadowRoot.querySelector(".card__title");
    if (element) {
      this._title = newValue;
    }
  }

  get title() { return this._title; }

  set description(newValue) {
    this._description = newValue;
    if (!this.shadowRoot) {
      return;
    }

    const element = this.shadowRoot.querySelector(".card__description");
    if (element) {
      this._description = newValue;
    }
  }

  get description() { return this._description; }

  set imageUrl(newValue) {
    this._imageUrl = newValue;
    if (!this.shadowRoot) {
      return;
    }

    const element = this.shadowRoot.querySelector(".card__image");
    if (element) {
      this._imageUrl = newValue;
    }
  }

  get imageUrl() { return this._imageUrl; }

  set imageSide(newValue) {
    this._imageSide = newValue;
    if (!this.shadowRoot) {
      return;
    }
  }

  get imageSide() { return this._imageSide; }
 
  createElementDom(tag, classCss) {
    const element = document.createElement(tag);
    if (classCss) {
      element.classList.add(classCss);
    }
    return element;
  }
}

/* customElements.define("advantage-card", AdvantageCard); */

