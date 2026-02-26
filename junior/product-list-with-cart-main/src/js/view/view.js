import { buildProductCards } from "./productCards.js";
import { bindProductCardEvents } from "./productCardEvents.js";
import { buildCart } from "./cart.js";
import { bindCartEvents } from "./cartEvents.js";
import { buildModal } from "./modal.js";
import { bindModalEvent } from "./modalEvents.js";

export function createView(controller) {

    controller.bindView({
        renderCatalog,
        renderCart,
        renderModal
    });

    // render catalog
    function renderCatalog(products, order) {
        const dessertList = document.querySelector(".desserts__list");
        dessertList.innerHTML = "";

        products.forEach(product => {
            dessertList.appendChild(buildProductCards(product, order));
        })

        bindProductCardEvents(dessertList, controller);
    }

    // render cart
    function renderCart(order) {
        const cart = document.querySelector(".cart");
        cart.innerHTML = buildCart(order);

        if (order.totalItems > 0) {
            bindCartEvents(cart, controller);
        }
    }

    // render modal
    function renderModal(order) {
        const modalRoot = document.querySelector(".modal-root");
        const body = document.querySelector("body");
        if (order.totalItems > 0) {
            modalRoot.innerHTML = buildModal(order);
            body.classList.add("no-scroll");
            bindModalEvent(controller);
        } else if (order.totalItems === 0) {
            body.classList.remove("no-scroll");
            modalRoot.innerHTML = "";
        }
    }

    return {
        renderCatalog,
        renderCart,
        renderModal
    };
}