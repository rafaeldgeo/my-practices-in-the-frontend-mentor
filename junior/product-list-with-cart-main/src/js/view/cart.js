export function buildCart(order) {
    return `
    <h2 class="cart__title">Your Cart (${order.totalItems})</h2>
    <div class="cart__empty ${order.totalItems > 0 ? "cart__empty--hidden" : ""}">
        <img
            class="cart__img-empty"
            src="public/assets/images/illustration-empty-cart.svg"
            alt="A cake with a slice removed"
            width="128"
            height="128"
        />
        <span class="cart__msg-empty"
            >Your added items will appear here</span
        >
    </div>
    <div class="cart__full ${order.totalItems > 0 ? "cart__full--show" : ""}">
        <ul class="cart__list">${order.items.map((item) => buildCartItemTemplate(item)).join("")}</ul>
        <div class="cart__total">
            <span class="cart__total-label">Order Total</span>
            <span class="order__total-value"><strong>$${order.totalOrderPrice.toFixed(2)}</strong></span>
        </div>
        <div class="cart__carbon-neutral">
            <img
            class="cart__icon-tree"
            src="public/assets/images/icon-carbon-neutral.svg"
            alt=""
            width="21"
            height="20"
            />
            <span class="cart__carbon-neutral-msg"
            >This is a <strong>carbon-neutral</strong> delivery</span
            >
        </div>
        <button class="cart__btn-confirm-order" type="button">
            Confirm Order
        </button>
    </div>
`;
}

function buildCartItemTemplate(item) {
    return `
    <li class="cart__item">
        <div class="cart__item-product">
            <div class="cart__item-details">
                <h4 class="cart__item-name">${item.name}</h4>
                <div class="cart__item-order">
                    <span class="cart__item-qtd" aria-live="polite">${item.quantity}x</span>
                    <span class="cart__item-price" aria-live="polite"
                    >@$${item.price.toFixed(2)}</span>
                    <span class="cart__item-total" aria-live="polite"
                    ><strong>${item.total.toFixed(2)}</strong></span
                    >
                </div>
            </div>
            <button
            class="cart__btn-remove"
            type="button"
            aria-label="remove item of the cart"
            data-name="${item.name}"
            >
            <svg
                class="cart__icon-remove-item"
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="none"
                viewBox="0 0 10 10"
            >
                <path
                fill="#AD8A85"
                d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                />
            </svg>
            </button>
        </div>
        <hr class="cart__bar"/>
    </li>
    `;

}



