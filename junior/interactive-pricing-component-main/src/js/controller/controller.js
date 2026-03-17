export function createController(model) {
    let view = null;

    ///connect function from view
    function bindView(viewInstance) {
        view = viewInstance;
    }

    // init layout
    function init() {
        model.subscribe((snapshot) => {
            view.renderUI(snapshot);
        });
    }

    // set page views value
    function onChangePageviewsSlider(tierIndex) {
        model.setCurrentTier(tierIndex);
    }

    // set period by label switch
    function onToggleBilling(period) {
        model.setBillingPeriod(period);
    }

    // interaction with switch
    function onToggleSwitch(){
        model.toggleBillingPeriod();
    }

    return {
        init,
        bindView,
        onChangePageviewsSlider,
        onToggleBilling,
        onToggleSwitch
    }
}
