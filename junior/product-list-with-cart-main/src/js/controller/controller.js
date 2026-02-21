import { findProductByName } from "../model/findProductByName.js";
import { getCatalogSnapshot } from "../model/getCatalogSnapshot.js";

export function createController({ catalog, model }) {
    let view = null;
    let order = {items:[]};
    const products = getCatalogSnapshot(catalog);

    function bindView(viewInstance) {
        view = viewInstance;
    }

    function init() {
        view.renderCatalog(products, order);
    }

    function onAddProduct(productName) {
        const product = findProductByName(catalog, productName);
        order = model.addItem(product);
        view.renderCatalog(products, order);
    }

    function onRemoveProduct(productName) {
        order = model.removeItem(productName);
    }

    function onConfirmOrder() {
        model.updateStatus("ORDER_CONFIRMED");
    }

    function onRemoveItemCart(productName) {
        model.removeItemCart(productName);
    }

    return {
        bindView,
        init,
        onAddProduct,
        onRemoveProduct,
        onRemoveItemCart,
        onConfirmOrder
    }
}