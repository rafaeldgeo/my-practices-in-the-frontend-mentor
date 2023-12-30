"use strict";

export default class NotificationItem extends HTMLElement {

    static get observedAttributes() {
        return ["user-img", "user-name", "type-notification", "time-notification", "new-notification"];
    }
    
    constructor() {
        super();
        this.userImageUrl = "https://fakeimg.pl/90x90?text=image";
        this.userName = "User Name";
        this.typeNotification = "no type";
        this.timeNotification = "define time";
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({mode:"open"});
        const templanteContent = document.getElementById("notification-item-element-template").content;
        const clonedContent = templanteContent.cloneNode(true);
        shadowRoot.appendChild(clonedContent);

        const imgUser = this.shadowRoot.querySelector(".notification-item__user-img");
        imgUser.src = this.userImageUrl;

        const aUserName = this.shadowRoot.querySelector(".notification-item__user-name");
        aUserName.innerText = this.userName;

        const spanTypeNotification = this.shadowRoot.querySelector(".notification-item__type-notification");
        spanTypeNotification.innerText = this.typeNotification;

        const aNotification = this.shadowRoot.querySelector(".notification-item__link");
        const typeNotification = this.getAttribute("type-notification");
        const styleLink = this.setStyleLink(typeNotification);
        aNotification.classList.add(styleLink);

        const spanTimeNotification = this.shadowRoot.querySelector(".notification-item__time");
        spanTimeNotification.innerText = this.timeNotification;
      
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (attributeName === "user-img") {
            this.userImageUrl = newValue;
        } else if (attributeName === "user-name") {
            this.userName = newValue;
        } else if (attributeName === "type-notification") {
            this.typeNotification = newValue;
        } else if (attributeName === "time-notification") {
            this.timeNotification = newValue;
        } 
    }

    set userImageUrl(newValue){
        this._userImageUrl = newValue;
        if (!this.shadowRoot) {
            return;
        }

        const element = this.shadowRoot.querySelector(".notification-item__user-img");
        if (element) { 
            element.src = this._userImageUrl; 
        }
    }

    get userImageUrl() {
        return this._userImageUrl; 
    }

    set userName(newValue){
        this._userName = newValue;
        if (!this.shadowRoot) {
            return;
        }

        const element = this.shadowRoot.querySelector(".notification-item__user-name");
        if (element) { 
            element.src = this._userName; 
        }
    }

    get userName() {
        return this._userName; 
    }

    set typeNotification(newValue) {
        switch (newValue) {
            case "reacted":
                this._message = "reacted to your recent post ";
                break;
            case "followed":
                this._message = "followed you";
                break;
            case "joined-group":
                this._message = "has joined your group ";
                break;
            case "left-group":
                this._message = "left the group ";
                break;
            case "commented":
                this._message = "commented on your picture";  
                break;
            case "sent-message":
                this._message = "sent you a private message ";
                break;
            default:
                this._message = "define a message.";            
        }

        if (!this.shadowRoot) {
            return;
        }
        
        const element = this.shadowRoot.querySelector(".notification-item__type-notification");
        if (element) {
            element.innerText = this._message;
        }
    }

    get typeNotification() {
        return this._message;
    }

    set timeNotification(newValue) {
        this._timeNotification = newValue;
        if (!this.shadowRoot) {
            return;
        }

        const element = this.shadowRoot.querySelector(".notification-item__time");
        if (element) {
            element.innerText = this._timeNotification;
        }
    }

    get timeNotification() {
        return this._timeNotification;
    }

    setStyleLink(typeNotification) {
        let styleLink = "";
        switch (typeNotification) {
            case "reacted":
                styleLink = "notification-item__link--post";
                break;
            case "joined-group":
            case "left-group":
                styleLink = "notification-item__link--group";
                break;
            default:
                styleLink = "notification-item__link--basic";
        }
        return styleLink;
    }
}

// include in index.js
/* customElements.define("notification-item", NotificationItem);  */



