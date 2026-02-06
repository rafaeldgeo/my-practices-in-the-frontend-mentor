export function createModal(){
    const cart = [];

    function addItem(product){
        let teste = cart.includes(product);
        
        if (!teste) {
            console.log("não existe");
            cart.push(product);
        } else {
            console.log("existe");
        }        
    }

    console.log(cart);
    

    return {
        addItem,
    }
}
