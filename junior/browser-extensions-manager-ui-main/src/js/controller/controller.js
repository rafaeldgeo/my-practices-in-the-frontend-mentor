export function createController(model) {

    function init() {
        model.loadExtensions();
    }

    function onToggleTheme() {
        model.toggleTheme();
    }

    function onSelectFilter(filterSelected) {
        model.selectFilter(filterSelected);
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
        onToggleStatusExtension
    }
}