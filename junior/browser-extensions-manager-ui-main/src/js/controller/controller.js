export function createController(model) {

    let view = null;

    async function init() {
        await model.loadExtensions();
    }

    // set the state to theme
    function onToggleTheme() {
        model.toggleTheme();
    }

    // set the state to filter
    function onSelectFilter(filterSelected) {
        model.selectFilter(filterSelected);
    }

    // get the view
    function setView(viewInstance) {
        view = viewInstance;
    }

    // create the snapshot the extensions
    function onStateChange(state) {
        const filterExtension = model.getFilteredExtensions();

        view.renderUI({
            ...state,
            filterExtension
        });
    }

    // send the card id remove
    function onRemoveExtension(id) {
        model.removeExtension(id);
    }

    // send the card id active or inactive
    function onToggleStatusExtension(id) {
        model.toggleStatusExtension(id);
    }

    return {
        init,
        onToggleTheme,
        onSelectFilter,
        onRemoveExtension,
        onToggleStatusExtension,
        onStateChange,
        setView
    }
}