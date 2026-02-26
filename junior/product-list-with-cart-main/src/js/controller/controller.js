import { findProductByName } from "../model/findProductByName.js";
import { getCatalogSnapshot } from "../model/getCatalogSnapshot.js";

export function createController({ catalog, model }) {
    let view = null;
    let order = {
        items: [],
        totalItems: 0,
        totalOrderPrice: 0
    };

    const products = getCatalogSnapshot(catalog);

    function bindView(viewInstance) {
        view = viewInstance;
    }

    function init() {
        view.renderCatalog(products, order);
        view.renderCart(order);
    }

    function onAddProduct(productName) {
        const product = findProductByName(catalog, productName);
        order = model.addItem(product);
        view.renderCatalog(products, order);
        view.renderCart(order);
    }

    function onRemoveProduct(productName) {
        order = model.removeItem(productName);
        view.renderCatalog(products, order);
        view.renderCart(order);
    }

    function onConfirmOrder() {
        model.updateStatus("ORDER_CONFIRMED");
        view.renderModal(order);
    }

    function onNewOrder() {
        order = model.emptyCart();
        view.renderModal(order);
        view.renderCatalog(products, order);
        view.renderCart(order);
    }

    function onRemoveItemCart(productName) {
        order = model.removeItemCart(productName);
        view.renderCatalog(products, order);
        view.renderCart(order);
    }

    return {
        bindView,
        init,
        onAddProduct,
        onRemoveProduct,
        onRemoveItemCart,
        onConfirmOrder,
        onNewOrder
    }
}