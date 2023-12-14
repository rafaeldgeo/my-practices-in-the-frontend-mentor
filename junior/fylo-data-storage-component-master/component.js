"use strict";

class StorageBar extends HTMLElement {

  static get observedAttributes() {
    return ["data-used", "data-capacity"];
  }
  
  constructor() {
    super();
  }

  connectedCallback(){
    const shadow = this.attachShadow({mode:"open"});

    const barContainer = document.createElement("div");
    barContainer.classList.add("storage__bar-container");

    const title = document.createElement("h2");
    title.classList.add("storage__title");
    const dataUsed = this.getAttribute("data-used");
    title.innerHTML = `You've used <strong>${dataUsed} GB</strong> of your storage`;

    const barWrapper = document.createElement("div");
    barWrapper.classList.add("storage__bar-wrapper");

    const barUsed = document.createElement("div");
    barUsed.classList.add("storage__bar-used");

    const barCircle = document.createElement("div");
    barCircle.classList.add("storage__bar-circle");

    const labelWrapper = document.createElement("div");
    labelWrapper.classList.add("storage__label-wrapper");

    const labelBegin = document.createElement("span");
    labelBegin.classList.add("storage__label");
    labelBegin.innerText = "0 GB";

    const labelEnd = document.createElement("span");
    labelEnd.classList.add("storage__label");
    const dataCapacity = this.getAttribute("data-capacity");
    labelEnd.innerText = `${dataCapacity} GB`;

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

    shadow.appendChild(style);
    shadow.appendChild(barContainer);
    barContainer.appendChild(title);
    barContainer.appendChild(barWrapper);
    barWrapper.appendChild(barUsed);
    barUsed.appendChild(barCircle);
    labelWrapper.appendChild(labelBegin);
    labelWrapper.appendChild(labelEnd);
    barContainer.appendChild(labelWrapper);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    } else {
      this[name] = newValue;
    }
  }
  
} 


class StorageLeft extends HTMLElement {

  static get observedAttributes() {
    return ["data-storage"];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({mode:"open"});   

    const storageLeftContainer = document.createElement("div");
    storageLeftContainer.classList.add("storage__storage-left");

    const storageValue = document.createElement("span");
    storageValue.classList.add("storage__value");
    const dataStorage = this.getAttribute("data-storage")
    storageValue.innerText = `${dataStorage}`;

    const storageUnit = document.createElement("span");
    storageUnit.classList.add("storage__unit");
    storageUnit.innerText = "GB Left";

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
    
    shadow.appendChild(style);
    shadow.appendChild(storageLeftContainer);
    storageLeftContainer.appendChild(storageValue);
    storageLeftContainer.appendChild(storageUnit); 
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    } else {
      this[name] = newValue;
    }
  }
}

customElements.define("storage-bar",StorageBar);
customElements.define("storage-left", StorageLeft);
