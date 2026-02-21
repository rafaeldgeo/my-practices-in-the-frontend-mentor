import { buildProductCards } from "./productCards.js";
import { bindProductCardEvents } from "./productCardEvents.js";

export function createView(controller) {

    controller.bindView({
        renderCatalog
    });

    function renderCatalog(products, order) {
        const dessertList = document.querySelector(".desserts__list");
        dessertList.innerHTML = "";

        products.forEach(product => {
            dessertList.appendChild(buildProductCards(product, order));
        })

        bindProductCardEvents(dessertList, controller);
    }

    return { renderCatalog };
}