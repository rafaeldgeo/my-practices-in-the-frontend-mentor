export function buildProductCards(product, order) {    
    const li = document.createElement("li");
    li.className = "product-card";
    li.innerHTML = template(product, order);
    return li;
}

function template(product, order) {
    const isIntoCart = order.items.some((item) => item.name === product.name);
    return `<div class="product-card__body">
                <span class="product-card__category">${product.category}</span>
                <h3 class="product-card__name">${product.name}</h3>
                <span class="product-card__price">$${product.price.toFixed(2)}</span>
            </div>
            <picture class="product-card__photo-wrapper">
                <source
                media="(min-width: 1024px)"
                srcset="public/${product.desktop}"
                />
                <source
                media="(min-width: 768px)"
                srcset="public/${product.tablet}"
                />
                <img
                class="product-card__photo ${isIntoCart ? "product-card__photo--selected" : ""}"
                src="public/${product.mobile}"
                alt=""
                width="654"
                height="424"
                data-name="${product.name}"               
                />
            </picture>
            <div class="product-card__actions">
                <button
                class="product-card__btn-add ${isIntoCart ? "product-card__btn-add--hidden" : ""}"
                type="button"
                data-name="${product.name}"
                >
                    <img
                    class="product-card__icon-add"
                    src="public/assets/images/icon-add-to-cart.svg"
                    alt=""
                    width="21"
                    height="20"
                    />
                    Add to Cart
                </button>
                <div class="product-card__quantity ${isIntoCart ? "product-card__quantity--show" : ""}">
                    <button
                    class="product-card__btn-quantity"
                    type="button"
                    aria-label="remove the dessert from the cart"
                    data-name="${product.name}"
                    >    
                        <svg
                        class="product-card__icon-quantity"
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 10 2"
                        >
                            <path fill="#ffffff" d="M0 .375h10v1.25H0V.375Z" />
                        </svg>   
                    </button>
                    <span class="product-card__total" aria-live="polite">1</span>
                    <button
                    class="product-card__btn-quantity"
                    type="button"
                    aria-label="add the dessert to the cart"
                    data-name="${product.name}"
                    >
                        <svg
                        class="product-card__icon-quantity"
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        >
                            <path
                            fill="#ffffff"
                            d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                            />
                        </svg>
                    </button>
                </div>
            </div>`
}

