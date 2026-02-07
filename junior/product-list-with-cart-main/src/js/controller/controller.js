import { findProductByName } from "../model/findProductByName.js";
import "../model/model.js";
import { createModal } from "../model/model.js";

export function createController(catalog) {
    const model = createModal();

    function onAddProduct(productName) {
        const product = findProductByName(catalog, productName);
        const order = model.addItem(product);
        console.log(order);
    }

    function onRemoveProduct(productName) {
        const order = model.removeItem(productName);
        console.log(order);
    }

    
    onAddProduct("Waffle with Berries");
    onAddProduct("Waffle with Berries");
    //onAddProduct("Waffle with Berries");
    //onRemoveProduct("Waffle with Berries");
    //onRemoveProduct("Waffle with Berries");
    //onRemoveProduct("Waffle with Berries");


}