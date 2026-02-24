import { buildProductCards } from "./productCards.js";
import { bindProductCardEvents } from "./productCardEvents.js";
import { buildCart } from "./cart.js";

export function createView(controller) {

    controller.bindView({
        renderCatalog,
        renderCart
    });

    function renderCatalog(products, order) {
        const dessertList = document.querySelector(".desserts__list");
        dessertList.innerHTML = "";

        products.forEach(product => {
            dessertList.appendChild(buildProductCards(product, order));
        })

        bindProductCardEvents(dessertList, controller);
    }

    function renderCart(order){
        const cart = document.querySelector(".cart"); 
        console.log(order);
        
        cart.innerHTML = buildCart(order);
    }

    return { 
        renderCatalog,
        renderCart 
    };
}