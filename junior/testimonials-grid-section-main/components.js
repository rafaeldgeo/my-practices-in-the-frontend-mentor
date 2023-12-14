"use strict";

class Testimonial extends HTMLElement {

  static get observedAttributes() {
    return ["data-img", "data-name", "data-title", "data-text", "data-background-color","data-text-color", "data-border-color"];
  }
  
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open"});

    const testimonialContainer = document.createElement("div");
    testimonialContainer.classList.add("testimonial__container");
    const backgroundColor = this.getAttribute("data-background-color");
    const textColor = this.getAttribute("data-text-color");
    const borderColor = this.getAttribute("data-border-color");
    let backgroundImage;
    if (this.hasAttribute("data-background-image")) {
      backgroundImage = 'url("./images/bg-pattern-quotation.svg")'; 
    } else {
      backgroundImage = "none";
    }

    const userWrapper = document.createElement("div");
    userWrapper.classList.add("testimononial__user-wrapper");

    const avatarWrapper = document.createElement("div");
    avatarWrapper.classList.add("testimonial__avatar-wrapper");
    
    const avatarImg = document.createElement("img");
    avatarImg.classList.add("testimonial__avatar-img");
    avatarImg.setAttribute("alt", "");
    avatarImg.setAttribute("width", "56");
    avatarImg.setAttribute("height", "56");
    avatarImg.src = this.getAttribute("data-img");

    const infoWrapper = document.createElement("div");
    infoWrapper.classList.add("testimonial__info-wrapper");

    const userName = document.createElement("span");
    userName.classList.add("testimonail__user-name");
    userName.textContent = this.getAttribute("data-name");

    const userVerifield = document.createElement("span");
    userVerifield.classList.add("testimonial__user-verifield");
    userVerifield.innerText = "Verifield Graduate";

    const testimonyWrapper = document.createElement("div");
    testimonyWrapper.classList.add("testimonial__testimony-wrapper");

    const testimonyTitle = document.createElement("h2");
    testimonyTitle.classList.add("testimonial__testimony-title");
    testimonyTitle.textContent = this.getAttribute("data-title");

    const testimonyText = document.createElement("p");
    testimonyText.classList.add("testimonial__testimony-text");
    testimonyText.textContent = this.getAttribute("data-text");

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
          
    shadow.appendChild(style);
    shadow.appendChild(testimonialContainer);
    testimonialContainer.appendChild(userWrapper);
    userWrapper.appendChild(avatarWrapper);
    avatarWrapper.appendChild(avatarImg);
    userWrapper.appendChild(infoWrapper);
    infoWrapper.appendChild(userName);
    infoWrapper.appendChild(userVerifield);
    testimonialContainer.appendChild(testimonyWrapper);
    testimonyWrapper.appendChild(testimonyTitle);
    testimonyWrapper.appendChild(testimonyText);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    } else {
      this[name] = newValue;
    }
  }
}

customElements.define("testimonial-user", Testimonial);
