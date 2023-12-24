"use strict";

const btnMarkAllRead = document.querySelector(".notification__btn-mark-all-read");
const spanBadge = document.querySelector(".notification__badge");

(function setbadge() {
    const listItensNotification = document.querySelectorAll("notification-item");
    let count = 0;
    listItensNotification.forEach((item) => {
        if (item.hasAttribute("new-notification")) {
            ++count;
        }
    });
    spanBadge.innerText = count
})();

if (spanBadge.value != "0") {
    btnMarkAllRead.addEventListener("click", ()=> {
        const listItensNotification = document.querySelectorAll("notification-item");
        listItensNotification.forEach((item) => {
            if (item.hasAttribute("new-notification")) {
                item.removeAttribute("new-notification");
                spanBadge.innerText = "0";
            }
        });
    });
}
