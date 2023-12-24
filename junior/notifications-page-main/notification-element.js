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
    const image = element.getAttribute("data-img-user");
    userImage.src = image; 

    divUserImgWrapper.appendChild(userImage);  
} 


function setTypeNotification(element) {

    const shadow = element.shadowRoot;
    const spanTypeNotification = shadow.querySelector(".notification-item__type-notification");
    const link = shadow.querySelector(".notification-item__link");
    const typeNotification = element.getAttribute("data-type-notification");
    let messageAction = "";

     switch (typeNotification) {
        case "reacted":
            messageAction = "reacted to your recent post ";
            link.classList.add("notification-item__link--post");
            break;
        case "followed":
            messageAction = "followed you";
            break;
        case "joined-group":
            messageAction = "has joined your group ";
            link.classList.add("notification-item__link--group");
            break;
        case "left-group":
            messageAction = "left the group ";
            link.classList.add("notification-item__link--group");
            break;
        case "commented":
            messageAction = "commented on your picture";
            const divPictureWrapper = shadow.querySelector(".notification-item__your-picture-wrapper");
            const pictureImage = document.createElement("img");
            pictureImage.classList.add("notification-item__picture-img");
            pictureImage.setAttribute("width", 90);
            pictureImage.setAttribute("height", 90);
            pictureImage.setAttribute("alt", "");
            pictureImage.setAttribute("tabindex", "0");
            const image = element.getAttribute("data-img-picture");
            pictureImage.src = image; 
            divPictureWrapper.appendChild(pictureImage);  
            break;
        case "sent-message":
            messageAction = "sent you a private message ";
            const divMessageWrapper = shadow.querySelector(".notification-item__message-wrapper");
            const privativeMessage = document.createElement("p");
            privativeMessage.classList.add("notification-item__privative-message");
            const slotPrivativeMessage = document.createElement("slot");
            slotPrivativeMessage.setAttribute("name", "privative-message");
            privativeMessage.appendChild(slotPrivativeMessage);
            divMessageWrapper.appendChild(privativeMessage);
            break;
        default:
            messageAction = "define a message.";            
    }

    spanTypeNotification.innerText = messageAction;
}

