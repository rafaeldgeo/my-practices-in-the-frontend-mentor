export function createController(model) {
    const tierDefaultIndex = 2;

    function init() {
        model.setCurrentTier(tierDefaultIndex);
        model.subscribe((snapshot) => {
            console.log(snapshot);
        })
    }

    function onChangePageviewsSlider(tierIndex) {
        model.setCurrentTier(tierIndex);
    }

    function onToggleBilling(period) {
        model.setBillingPeriod(period);
    }

    return {
        init,
        onChangePageviewsSlider,
        onToggleBilling
    }
}
