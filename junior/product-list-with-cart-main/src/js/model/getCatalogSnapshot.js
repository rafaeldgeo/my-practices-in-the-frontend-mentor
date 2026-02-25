export function getCatalogSnapshot(catalog) {

    const product = catalog.map((item) => {
        return {
            category: item.category,
            name: item.name,
            price: item.price,
            mobile: item.image.mobile,
            tablet: item.image.tablet,
            desktop: item.image.desktop,
            thumbnail: item.image.thumbnail
        }
    })
    return product;
}