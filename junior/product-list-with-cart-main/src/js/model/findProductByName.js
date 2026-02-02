export function findProductByName(catalog, name) {

    const product = catalog.find((item) => item.name === name);

    if (!product) {
        throw new Error("Product don't found!");
    }

    return {
        name: product.name,
        price: product.price
    };
    
}