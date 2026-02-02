import { findProductByName } from "../model/findProductByName.js";

export function createController(catalog) {
    console.log(catalog);
    const t = findProductByName(catalog, "Waffle with Berries");
    console.log(t);
}