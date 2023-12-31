"use strict";

 export default class ToggleSwitch extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({mode:"open"});
        const templateContent = document.getElementById("toggle-switch-element-template").content;
        const clonedContent = templateContent.cloneNode(true);
        shadowRoot.appendChild(clonedContent);
    }

}

// insert index.js
/* customElements.define("toggle-switch", ToggleSwitch); */