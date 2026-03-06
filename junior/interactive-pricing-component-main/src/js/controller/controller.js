export function createController(model) {

    function init() {
        model.setCurrentTier(2);
    }

    model.subscribe((snapshot) => {
        console.log(snapshot);
    })

    model.setCurrentTier(2)

    return {
        init,
    }
}
