export function bindProductCardEvents(dessertList, controller) {
    const productCards = dessertList.querySelectorAll(".product-card");
   
    productCards.forEach((card) => {
        card.addEventListener("click", (e) => {
            dispatchUserIntent(e);
        })
    });

    function dispatchUserIntent(e) {
        const elementClicked = e.target;
        const product = elementClicked.dataset.name;
        if (elementClicked.classList.contains("product-card__btn-add")) {
            controller.onAddProduct(product);
        }
    }
}

