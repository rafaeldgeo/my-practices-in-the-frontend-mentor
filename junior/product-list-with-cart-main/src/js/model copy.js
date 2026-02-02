let totalOrderItems = 0;
let orderTotal = 0;
let cart = [{
    name: "Classic Tiramisu",
    qtd: 1,
    price: 5.50,
    total: 5.50
}];

let cartItens = [{
    name: "Classic Tiramisu",
    price: 5.50,
},
{
    name: "Vanilla Bean Crème Brûlée",
    price: 7.00,
},
{
    name: "Classic Tiramisu",
    price: 5.50,
},
{
    name: "batata",
    price: 5.50,
}];

const calculateTotalPerDessert = (items) => {
    const TotalPerDessert = items.reduce((acc, item) => {
        if (item.name in acc) {
            acc[item.name]++
        } else {
            acc[item.name] = 1;
        }
        return acc;
    }, {});
    return TotalPerDessert;
}

const calculateOrderTotal = (items) => {
    const totalOrder = items.reduce((acc, item) => {
        return acc + item.price;
    }, 0)
    return totalOrder;
}

totalOrderItems = cartItens.length

console.log(calculateTotalPerDessert(cartItens));
console.log(calculateOrderTotal(cartItens));
console.log(totalOrderItems);