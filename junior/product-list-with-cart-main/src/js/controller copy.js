import { findProductByName } from "./model/findProductByName.js";

export function createController({ catalog }) {
    console.log("Controller created with catalog");

    function onAddProduct(productName) {
        // console.log(`Usuário clicou em ADD: ${productName}`);
        //model.add(productName)
        let t = findProductByName({ catalog, name: productName });
        console.log(t);
    }

    function onRemoveProduct(productName) {
        // console.log(`Usuário clicou em REMOVE: ${productName}`);
        //model.remove(productName)
    }

    return {
        onAddProduct,
        onRemoveProduct
    }
}