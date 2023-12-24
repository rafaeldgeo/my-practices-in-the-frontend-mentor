"use strict";

class NotificationItem extends HTMLElement {
    
    constructor() {
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({mode:"open"});
        const templanteContent = document.getElementById("notification-item-element-template").content;
        const clonedContent = templanteContent.cloneNode(true);
        shadowRoot.appendChild(clonedContent);

        setUserImage(this);
        setTypeNotification(this);

    }
  
}

customElements.define("notification-item", NotificationItem); 

function setUserImage(element) {

    const shadow = element.shadowRoot;
    const divUserImgWrapper = shadow.querySelector(".notification-item__user-img-wrapper");
    const userImage = document.createElement("img");

    userImage.classList.add("notification-item__user-img");
    userImage.setAttribute("width", 90);
    userImage.setAttribute("height", 90);
    userImage.setAttribute("alt", "User Photo");
    const image = element.getAttribute("data-image");
    userImage.src = image;
    divUserImgWrapper.appendChild(userImage); 
  
} 

function setTypeNotification(element) {

    const shadow = element.shadowRoot;
    const spanTypeNotification = shadow.querySelector(".notification-item__type-notification");
    const typeNotification = element.getAttribute("data-type-notification");
    let messageAction = "";

     switch (typeNotification) {
        case "reacted":
            messageAction = "reacted to your recent post ";
            break;
        case "followed":
            messageAction = "followed you";
            break;
        case "joined-group":
            messageAction = "has joined your group ";
            break;
        case "left-group":
            messageAction = "left the group ";
            break;
        case "commented":
            messageAction = "commented on your picture";
            break;
        case "sent-message":
            messageAction = "sent you a private message ";
            break;
        default:
            messageAction = "define a message.";            
    }

    spanTypeNotification.innerText = messageAction;
}

