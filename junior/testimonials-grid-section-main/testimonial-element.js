"use strict";

export default class Testimonial extends HTMLElement {

  static get observedAttributes() {
    return ["img-url", "background-color", "text-color", "border-color", "user-name", "title", "text", "background-image"];
  }
  
  constructor() {
    super();
    this.userImageUrl = "https://fakeimg.pl/56x56?text=photo";
    this.backgroundColor = "#ffffff";
    this.textColor = "#000000";
    this.borderColor = "#000000";
    this.userName = "Define user name";
    this.title = "Define a title";
    this.text = "Define a text";
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (attributeName === "img-url") {
      this.userImageUrl = newValue;
    } else if (attributeName === "background-color") {
      this.backgroundColor = newValue;
    } else if (attributeName === "user-name") {
      this.userName = newValue;
    } else if (attributeName === "title") {
      this.title = newValue;
    } else if (attributeName === "text") {
      this.text = newValue;
    } else if (attributeName === "text-color") {
      this.textColor = newValue;
    } else if (attributeName === "border-color") {
      this.borderColor = newValue;
    }
  }

  connectedCallback() {

    const shadowRoot = this.attachShadow({ mode: "open"});

    const divTestimonialContainer = this.createElementDom("div","testimonial__container");
    const backgroundColor = this.backgroundColor;
    const textColor = this.textColor;
    const borderColor = this.borderColor;

    const divUserWrapper = this.createElementDom("div", "testimononial__user-wrapper");
    const divAvatarWrapper = this.createElementDom("div", "testimonial__avatar-wrapper");

    const imgAvatar = this.createElementDom("img", "testimonial__avatar-img");
    imgAvatar.setAttribute("alt", "Image Avatar");
    imgAvatar.setAttribute("width", "56");
    imgAvatar.setAttribute("height", "56");
    imgAvatar.src = this.userImageUrl;

    const divInfoWrapper = this.createElementDom("div", "testimonial__info-wrapper");   
    const spanUserName = this.createElementDom("span", "testimonail__user-name");
    spanUserName.innerText = this.userName;

    const spanUserVerifield = this.createElementDom("span", "testimonial__user-verifield");
    spanUserVerifield.innerText = "Verifield Graduate";

    const divTestimonyWrapper = this.createElementDom("div", "testimonial__testimony-wrapper");

    const h2TestimonyTitle = this.createElementDom("h2", "testimonial__testimony-title");
    h2TestimonyTitle.innerText = this.title;

    const pTestimonyText = this.createElementDom("p", "testimonial__testimony-text");
    pTestimonyText.innerText = this.text;

    let backgroundImage = "none";
    if (this.hasAttribute("background-image")) {
      backgroundImage = 'url("./images/bg-pattern-quotation.svg")'; 
    }

    const style = document.createElement("style");
    style.textContent = 
      `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      .testimonial__container {
        padding: min(7vw, 1.6rem) min(8vw, 2rem); 
        max-width: 100%;
        height: 100%;
        border-radius: 10px;
        box-shadow: 10px 20px 60px rgba(0, 0, 0, 0.2);
        background-color: ${backgroundColor};
        background-image: ${backgroundImage};
        background-repeat: no-repeat;
        background-size: 30%;
        background-position: top right 10%;
      }

      .testimononial__user-wrapper {
        display: inline-flex;
        align-items: center;
        column-gap: 10px;
      }

      .testimonial__avatar-img {
        display: block;
        margin: auto 0;
        border-radius: 50%;
        border: 2px solid ${borderColor};
        object-fit: contain;
        width: min(10vw, 35px);
        height: min(10vw, 35px);
      }

      .testimonial__info-wrapper {
        display: flex;
        flex-direction: column;
      }

      .testimonail__user-name {
        font-size: clamp(0.6rem, 4vw, 0.9rem);
        color: ${textColor};
        white-space: nowrap;
      }

      .testimonial__user-verifield {
        font-size: clamp(0.6rem, 3vw, 0.7rem);
        color: ${textColor};
        opacity: 0.5;
        white-space: nowrap;
      }

      .testimonial__testimony-title {
        font-size: clamp(0.6rem, 5.8vw, 1.4rem);
        color: ${textColor};
        margin: min(2vw, 0.9rem) 0 min(2vw, 1.2rem) 0; 
      }

      .testimonial__testimony-text {
        font-size: clamp(0.6rem, 4vw, 1rem);
        line-height: calc(clamp(0.6rem, 4vw, 1rem) * 1.5);
        opacity: 0.7;
        color: ${textColor};
      }

      @media only screen and (min-width: 576px) {

        .testimonial__container {
          padding: min(2vw, 1.5rem) min(2vw, 2rem); 
          background-size: 20%;
          background-position: top right 20%;
        }

        .testimonail__user-name {
          font-size: clamp(0.6rem, 2vw, 1rem);
        }

        .testimonial__user-verifield {
          font-size: clamp(0.6rem, 2vw, 0.7rem);
        }

        .testimonial__testimony-title {
          font-size: clamp(0.6rem, 2vw, 1.2rem);
          margin: min(2vw, 0.9rem) 0 min(2vw, 1.2rem) 0; 
        }

        .testimonial__testimony-text {
          font-size: clamp(0.6rem, 2vw, 0.8rem);
          line-height: calc(clamp(0.6rem, 2vw, 0.8rem) * 1.5);
        }
        
      }
      `;
    
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(divTestimonialContainer);
    divTestimonialContainer.appendChild(divUserWrapper);
    divUserWrapper.appendChild(divAvatarWrapper);
    divAvatarWrapper.appendChild(imgAvatar);
    divUserWrapper.appendChild(divInfoWrapper);
    divInfoWrapper.appendChild(spanUserName);
    divInfoWrapper.appendChild(spanUserVerifield);
    divTestimonialContainer.appendChild(divTestimonyWrapper);
    divTestimonyWrapper.appendChild(h2TestimonyTitle);
    divTestimonyWrapper.appendChild(pTestimonyText);
  }

  set userImageUrl(newValue) {
    this._userImageUrl = newValue;
    if (!this.shadowRoot) {
      return;
    }
  }

  get userImageUrl() { return this._userImageUrl; }

  set backgroundColor(newValue) {
    this._backgroundColor = newValue;
    if (!this.shadowRoot) {
      return;
    }
  }

  get backgroundColor() { return this._backgroundColor; }

  set textColor(newValue) {
    this._textColor = newValue;
    if (!this.shadowRoot) {
      return;
    }
  }

  get textColor() { return this._textColor; }

  set borderColor(newValue) {
    this._borderColor = newValue;
    if (!this.shadowRoot) {
      return;
    }
  }

  get borderColor() { return this._borderColor; }

  set userName(newValue) {
    this._userName = newValue;
    if (!this.shadowRoot) {
      return;
    }
  }

  get userName() { this._userName; }

  set title(newValue) {
    this._title = newValue;
    if (!this.shadowRoot) {
      return;
    }
  }

  get title() { return this._title; }

  set text(newValue) {
    this._text = newValue;
    if (!this.shadowRoot) {
      return;
    }
  }

  get text() { return this._text; }

  createElementDom(tag, classCss) {
    const element = document.createElement(tag);
    if (classCss) {
      element.classList.add(classCss);
    }
    return element;
  }

}

/* customElements.define("testimonial-user", Testimonial); */
