"use strict";

export default class Buttondownload extends HTMLElement {

  static get observedAttributes() {
    return ["label", "background-color", "border-color", "box-shadow"];
  }
    
  constructor() {
    super();
    this.label = "define label";
    this.backgroundColor = "#000000";
    this.borderColor = "#666666";
    this.boxShadow = "#e6e6e6";
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (attributeName === "label") {
      this.label = newValue;
    } else if (attributeName === "background-color") {
      this.backgroundColor = newValue;
    } else if (attributeName === "border-color") {
      this.borderColor = newValue;
    } else if (attributeName === "box-shadow") {
      this.boxShadow = newValue;
    }
  }

  connectedCallback() {

    const shadowRoot = this.attachShadow({mode: "open"});

    const btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.innerText = this.label;

    const backgroundColor = this.backgroundColor;
    const borderColor = this.borderColor;
    const boxShadow = this.boxShadow;

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

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(btn);        
  }

  set label(newValue) {
    this._label = newValue;
    if (!this.shadowRoot) {
      return;
    }
  }

  get label() { return this._label }

  set backgroundColor(newValue) {
    this._backgroudColor = newValue;
    if (!this.shadowRoot) {
      return;
    }
  }

  get backgroundColor() { return this._backgroudColor; }

  set borderColor(newValue) {
    this._borderColor = newValue;
    if (!this.shadowRoot) {
      return;
    }
  }

  get borderColor() { return this._borderColor; }

  set boxShadow(newValue) {
    this._boxShadow = newValue;
    if (!this.shadowRoot) {
      return;
    }
  }

  get boxShadow() { return this._boxShadow; }
 
}

/* customElements.define("btn-download", Buttondownload); */