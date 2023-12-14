"use strict";

class Buttondownload extends HTMLElement {

  static get observedAttributes() {
    return ["data-label", "data-backgroundColor", "data-borderColor", "data-boxShadow"];
  }
    
  constructor() {
    super();
  }

  connectedCallback() {

    const shadow = this.attachShadow({mode: "open"});

    const btn = document.createElement("button");
    btn.innerText = this.getAttribute("data-label");
    btn.setAttribute("type", "button");

    const backgroundColor = this.getAttribute("data-backgroundColor");
    const borderColor = this.getAttribute("data-borderColor");
    const boxShadow = this.getAttribute("data-boxShadow");

    const style = document.createElement("style");
    style.textContent = `

    button {
      padding: 12px min(5vw, 2.2rem);
      border: 2px solid ${borderColor};
      border-top: 2px;
      border-radius: 25px;
      font-family: var(--font);
      font-size: clamp(0.6rem, 5vw, 0.9rem);
      font-weight: 600;
      color: var(--white);
      background-color: ${backgroundColor};
      box-shadow: 1px 5px 5px 1px ${boxShadow};
      cursor: pointer;
    }

    button:hover {
      opacity: 0.6;
    }
    
    `;   

    shadow.appendChild(style);
    shadow.appendChild(btn);        
  }

  attributeChangedCallcack(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    } else {
       this[name] = newValue;
    }
    
  }
}

customElements.define("btn-download", Buttondownload);