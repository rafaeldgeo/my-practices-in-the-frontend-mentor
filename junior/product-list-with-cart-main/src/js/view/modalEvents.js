export function bindModalEvent(controller){
    const bntNewOrder = document.querySelector(".modal__btn-new-order");

    bntNewOrder.addEventListener("click", (e) => {
        controller.onNewOrder();
    })
}
