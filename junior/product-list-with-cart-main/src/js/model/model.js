export function createModel() {
    const cart = [];
    let orderStatus = "NOT_STARTED";

    // add item into the cart
    function addItem(product) {
        const found = cart.find((item) => item.name === product.name);

        if (!found) {
            cart.push({ ...product, quantity: 1 });
        } else {
            found.quantity++;
        }
        updateStatus("ITEM_ADD");
        return snapShot();
    }

    // remove item into the cart
    function removeItem(productName) {
        const foundIndex = cart.findIndex((item) => item.name === productName);
        const item = cart[foundIndex];

        if (foundIndex === -1) {
            return snapShot();  // ver comportamento quando fizer interação na view, apertar botão de retirar mesmo sendo zero
        }

        if (item && item.quantity > 1) {
            item.quantity--;
        } else if (item && item.quantity === 1) {
            cart.splice(foundIndex, 1);
        }
        updateStatus("ITEM_REMOVED");
        return snapShot();
    }

    // calculate the total items into the cart
    function calculateOrderItemsTotal() {
        const totalItems = cart.reduce((acc, item) => {
            return acc + item.quantity;
        }, 0);
        return totalItems;
    }

    // calculate the total price of the order
    function calculateOrderPriceTotal() {
        const totalOrderPrice = cart.reduce((acc, item) => {
            return acc + (item.price * item.quantity)
        }, 0);
        return totalOrderPrice;
    }

    // update status of the order
    function updateStatus(event) {
        switch (event) {
            case "ITEM_ADD":
            case "ITEM_REMOVED":
                if (calculateOrderItemsTotal() > 0) {
                    orderStatus = "IN_PROGRESS";
                } else {
                    orderStatus = "NOT_STARTED";
                }
                break;
            case "ORDER_CONFIRMED":
                orderStatus = "CONFIRMED"
                break;
            default:
        }
        console.log(orderStatus);
        return orderStatus;
    }

    // return the datas that will be render by view
    function snapShot() {
        return {
            items: cart.map((item) => {
                return { ...item, total: item.price * item.quantity }
            }),
            totalItems: calculateOrderItemsTotal(),
            totalOrderPrice: calculateOrderPriceTotal()
        }
    }

    return {
        addItem,
        removeItem,
        updateStatus
    }
}
