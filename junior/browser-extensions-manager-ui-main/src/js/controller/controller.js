export function createController(model){
   
    function init() {
        model.loadExtensions();
    }

    return {
        init,
    }
}