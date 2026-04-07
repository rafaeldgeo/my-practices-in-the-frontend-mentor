export function createController(model) {

    let view = null;

    function init() {
        model.loadExtensions();
    }

    function onToggleTheme() {
        model.toggleTheme();
    }

    function onSelectFilter(filterSelected) {
        model.selectFilter(filterSelected);
    }

    function setView(viewInstance) {
        view = viewInstance;
    }

    function onStateChange(state) {
        const filterExtension = model.getFilteredExtensions();

        view.renderUI({
            ...state,
            filterExtension
        });
    }

    function onRemoveExtension(id) {
        model.removeExtension(id);
    }

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