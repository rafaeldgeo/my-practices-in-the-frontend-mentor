import { findProductByName } from "../model/findProductByName.js";

export function createController({ catalog, model }) {

    function onAddProduct(productName) {
        const product = findProductByName(catalog, productName);
        const order = model.addItem(product);
    }

    function onRemoveProduct(productName) {
        const order = model.removeItem(productName);
    }

    function onConfirmOrder() {
        model.updateStatus("ORDER_CONFIRMED");
    }

    function onRemoveItemCart(productName) {
        model.removeItemCart(productName);
    }

    return {
        onAddProduct,
        onRemoveProduct,
        onRemoveItemCart,
        onConfirmOrder
    }
}