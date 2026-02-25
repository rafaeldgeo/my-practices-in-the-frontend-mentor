export function buildModal(order) {
    return `
    <div class="modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title">
        <div class="modal__overlay"></div>
        <div class="modal__container">
            <div class="modal__header">
                <img
                    class="modal__icon-confirmed"
                    src="public/assets/images/icon-order-confirmed.svg"
                    alt=""
                    width="42"
                    height="42"
                />
                <h2 class="modal__title" id="modal-title">Order Confirmed</h2>
                <span class="modal__msg">We hope you enjoy your food!</span>
            </div>
            <div class="modal__body">
                <ul class="modal__list">${order.items.map((item) => buildModalItemsTemplate(item)).join("")}</ul>
                <div class="modal__total">
                    <span class="modal__total-label">Order Total</span>
                    <span class="modal__total-order"><strong>$${order.totalOrderPrice.toFixed(2)}</strong></span>
                </div>
            </div>
            <div class="modal__footer">
                <button class="modal__btn-new-order" type="button">Start New Order</button>
            </div>
        </div>
    </div>
`;
}

function buildModalItemsTemplate(item) {
    return `
    <li class="modal__item">
        <div class="modal__item-product">
            <div class="modal__item-photo-wrapper">
                <img
                class="modal__item-photo"
                src="public/${item.thumbnail}"
                alt=""
                width="100"
                height="96"
                  />
            </div>
            <div class="modal__item-details">
                <h3 class="modal__item-name">${item.name}</h3>
                <div class="modal__item-values">
                    <span class="modal__item-quantity">${item.quantity}x</span>
                    <span class="modal__item-price">@$ ${item.price.toFixed(2)}</span>
                </div>
            </div>
            <span class="modal__item-price-total">$${item.total.toFixed(2)}</span>
        </div>
        <hr class="modal__bar"/>
    </li> 
    `;
}