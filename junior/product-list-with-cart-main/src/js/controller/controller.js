import { findProductByName } from "../model/findProductByName.js";

export function createController({catalog, model}) {
    
    function onAddProduct(productName) {
        const product = findProductByName(catalog, productName);
        const order = model.addItem(product);
        console.log(order);
    }

    function onRemoveProduct(productName) {
        const order = model.removeItem(productName);
        console.log(order);
    }

    function onConfirmOrder(){
        model.updateStatus("ORDER_CONFIRMED");
    }

    return {
        onAddProduct,
        onRemoveProduct,
        onConfirmOrder,
    }
}