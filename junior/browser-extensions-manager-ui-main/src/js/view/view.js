export function createView(controller) {

    function renderView(state) {
        console.log(state);
    }

    // controller.onToggleTheme();
    // controller.onSelectFilter(filterSelected);
    // controller.onRemoveExtension(id);
    // controller.onToggleStatusExtension(id);

    return {
        renderView
    }
}