export function bindCartEvents(cart, controller) {
    const btnsRemove = cart.querySelectorAll(".cart__btn-remove");
    const btnConfirm = cart.querySelector(".cart__btn-confirm-order");

    btnsRemove.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const btnClicked = e.currentTarget;
            const productRemove = btnClicked.dataset.name;
            controller.onRemoveItemCart(productRemove);
        })
    })

    btnConfirm.addEventListener("click", () => {
        controller.onConfirmOrder();
    });
} 