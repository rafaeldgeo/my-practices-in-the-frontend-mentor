export function bindProductCardEvents(dessertList, controller) {
    const btns = dessertList.querySelectorAll("button");

    btns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            dispatchUserIntent(e.currentTarget);
        })
    });

    function dispatchUserIntent(btnClicked) {
        const product = btnClicked.dataset.name;
        const action = btnClicked.dataset.action;
        
        if (btnClicked.classList.contains("product-card__btn-add") || action === "increase") {
            controller.onAddProduct(product);
        }

        if (action === "decrease") {
            controller.onRemoveProduct(product);
        }
    }
}


