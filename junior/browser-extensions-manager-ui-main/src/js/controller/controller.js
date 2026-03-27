export function createController(model){
    
    async function init() {
        await model.loadExtensions();
        const extensions = model.getFilteredExtensions();
        const firstId = extensions[0].id;
        model.removeExtension(firstId);
      
        console.log(model.getFilteredExtensions());
    }


    return {
        init,
    }
}