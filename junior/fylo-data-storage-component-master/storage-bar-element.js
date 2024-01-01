"use strict";

class StorageBar extends HTMLElement {

  static get observedAttributes() {
    return ["used", "capacity"];
  }
  
  constructor() {
    super();
    this.used = "define value";
    this.capacity = "define value";
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (attributeName === "used") {
      this.used = newValue;
    } else if (attributeName === "capacity") {
      this.capacity = newValue;
    }
  }

  connectedCallback(){
    const shadowRoot = this.attachShadow({mode:"open"});

    const divBarContainer = this.createElementDom("div", "storage__bar-container");
    
    const h2Title = this.createElementDom("h2","storage__title");
    const used = this.used;
    h2Title.innerHTML = `You've used <strong>${used} GB</strong> of your storage`;

    const divBarWrapper = this.createElementDom("div","storage__bar-wrapper");
    const divBarUsed = this.createElementDom("div", "storage__bar-used");
    const divBarCircle = this.createElementDom("div", "storage__bar-circle");
    const divLabelWrapper = this.createElementDom("div", "storage__label-wrapper");
    
    const spanLabelBegin = this.createElementDom("span","storage__label");
    spanLabelBegin.innerText = "0 GB";

    const spanLabelEnd = this.createElementDom("span","storage__label");
    const capacity = this.capacity;
    spanLabelEnd.innerText = `${capacity} GB`;

    const style = document.createElement("style");
    style.textContent = `

    .storage__bar-container {
      width: 85%;
      position: absolute;
      top: 25%;
      left: 7%;
    }

    .storage__title {
      margin: 0;
      font-size: 0.9rem;
      text-align: center;
      font-weight: 400;
      color: var(--pale-blue);
    }

    .storage__bar-wrapper {
      width: 98%;
      margin: 1rem 0 0.3rem 0;
      display: flex;
      align-items: center;
      padding: 0.2rem;
      border-radius: 25px;
      background-color: var(--very-dark-blue);
    }

    .storage__bar-used {
      width: 75%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: .06rem;
      border-radius: 25px;
      background-image: linear-gradient(to right, var(--pale-pink), var(--dark-pink));
    }

    .storage__bar-circle {
      width: 12px;
      height: 12px;
      border-radius: 25px;
      background-color: var(--light);
    }

    .storage__label-wrapper {
      display: flex;
      justify-content: space-between;
    }

    .storage__label {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--pale-blue);
    }

    @media only screen and (min-width:532px) {

      .storage__title {
        text-align: left;
      }
    
    }
    
    `;

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(divBarContainer);
    divBarContainer.appendChild(h2Title);
    divBarContainer.appendChild(divBarWrapper);
    divBarWrapper.appendChild(divBarUsed);
    divBarUsed.appendChild(divBarCircle);
    divLabelWrapper.appendChild(spanLabelBegin);
    divLabelWrapper.appendChild(spanLabelEnd);
    divBarContainer.appendChild(divLabelWrapper);
  }

  set used(newValue) {
    this._used = newValue;
    if (!this.shadowRoot) {
      return;
    }
  }

  get used() { return this._used; }

  set capacity(newValue) {
    this._capacity = newValue;
    if (!this.shadowRoot) {
      return;
    }
  }

  get capacity() { return this._capacity; }

  createElementDom(tag, classCss) {
    const element = document.createElement(tag);
    if (classCss) {
      element.classList.add(classCss);
    }
    return element;
  }

} 


class StorageLeft extends HTMLElement {

  static get observedAttributes() {
    return ["storage"];
  }

  constructor() {
    super();
    this.storage = "define value";
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (attributeName === "storage") {
      this.storage = newValue;
    }
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({mode:"open"});   

    const divStorageLeftContainer = this.createElementDom("div","storage__storage-left");

    const spanStorageValue = this.createElementDom("span", "storage__value");
    const storage = this.storage;
    spanStorageValue.innerText = `${storage}`;

    const spanStorageUnit = this.createElementDom("span","storage__unit");
    spanStorageUnit.innerText = "GB Left";

    const style = document.createElement("style");
    style.textContent = `

    .storage__storage-left {
      position: absolute;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding: min(4vw, 0.9rem);
      gap: min(3vw, 0.6rem);
      bottom: -40%;
      right: 25%;
      border-radius: 8px;
      background-color: var(--light);
      max-width: 50%;
    }

    .storage__value {
      font-size: clamp(1.8rem, 11vw, 2.5rem);
      font-weight: 700;
      color: var(--very-dark-blue);
    } 

    .storage__unit {
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      white-space: wrap;
      color: var(--grayish-blue);
    }

    @media only screen and (min-width:532px) {

      .storage__storage-left {
        gap: 10px;
        bottom: 85%;
        right: 8%;
        border-radius: 8px 8px 0 8px;
        min-width: 28%;
      }
    
      .storage__storage-left::after {
        content: "";
        position: absolute;
        top: 100%;
        right: 0%;
        margin-left: -12px;
        border-width: 10px;
        border-style: solid;
        border-color: var(--light) var(--light) transparent transparent;
      }

      .storage__value {
        font-size: 2.5rem;
      } 

      .storage__unit {
        white-space: nowrap;
      }

    }

    `;
    
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(divStorageLeftContainer);
    divStorageLeftContainer.appendChild(spanStorageValue);
    divStorageLeftContainer.appendChild(spanStorageUnit); 
  }

  set storage(newValue) {
    this._storage = newValue;
    if (!this.shadowRoot) {
      return;
    }
  }

  get storage() { return this._storage; }

  createElementDom(tag, classCss) {
    const element = document.createElement(tag);
    if (classCss) {
      element.classList.add(classCss);
    }
    return element;
  }

}

/* customElements.define("storage-bar",StorageBar);
customElements.define("storage-left", StorageLeft); */

export {StorageBar, StorageLeft};
