import { findProductByName } from "../model/findProductByName.js";
import "../model/model.js";
import { createModal } from "../model/model.js";

export function createController(catalog) {
    const model = createModal();

    function onAddProduct(productName){
        const product = findProductByName(catalog,productName);
        model.addItem(product);
    }

    onAddProduct("Waffle with Berries");
    onAddProduct("Waffle with Berries");

    
}