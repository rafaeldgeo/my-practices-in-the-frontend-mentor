export function createController(model) {
    let view = null;

    function bindView(viewInstance) {
        view = viewInstance;
    }

    function init() {
        model.subscribe((snapshot) => {
            view.renderUI(snapshot);
        });
    }

    function onChangePageviewsSlider(tierIndex) {
        model.setCurrentTier(tierIndex);
    }

    function onToggleBilling(period) {
        model.setBillingPeriod(period);
    }

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
