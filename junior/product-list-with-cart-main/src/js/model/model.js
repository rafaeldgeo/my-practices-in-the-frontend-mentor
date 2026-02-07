export function createModal() {
    const cart = [];

    function addItem(product) {

        const found = cart.find((item) => item.name === product.name);

        if (!found) {
            cart.push({ ...product, quantity: 1 });
        } else {
            found.quantity++;
        }
    }

    function removeItem(productName) {

        const foundIndex = cart.findIndex((item) => item.name === productName);
        const item = cart[foundIndex];

        if (item && item.quantity > 1) {
            item.quantity--;
        }

        if (item && item.quantity === 1) {
            cart.splice(item, 1);
        }

        if (foundIndex === -1) return;
    }

    console.log(cart);

    return {
        addItem,
        removeItem
    }
}
