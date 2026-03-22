export function createController(model){
    
    async function init() {
        await model.loadExtensions();
        console.log(model.getFilteredExtensions());
    }


    return {
        init,
    }
}