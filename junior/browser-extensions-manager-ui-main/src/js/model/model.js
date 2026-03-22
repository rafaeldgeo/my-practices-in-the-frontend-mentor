export function createModel() {

    const state = {
        extensions: [],   // domínio
        filter: 'all',    // UI
        theme: 'light',   // UI
        status: 'idle'    // UI
    }

    async function loadExtensions() {
        console.log("entrou");
        const DATA_SOURCE = "../assets/data/data.json";
        try {
            const response = await fetch(DATA_SOURCE);

            if (!response.ok) {
                throw new Error(`Erro in request: ${response.status}`);
            }

            const data = await response.json();
            state.extensions = data;
            state.status = "success";

        } catch (error) {
            state.status = "error";
        }
    }

    function toggleTheme() {
        state.theme = state.theme === "light" ? "dark" : "light";
    }

    function selectFilter(filterSelected) {
        state.filter = filterSelected;
    }

    function getFilteredExtensions() {
        const extensions = state.extensions;

        if (state.filter === "all") {
            return extensions;
        } else if (state.filter === "active") {
            return extensions.filter((extension) => extension.isActive);
        } else if (state.filter === "inactive") {
            return extensions.filter((extension) => !extension.isActive);
        } else {
            return [];
        }
    }

    return {
        loadExtensions,
        toggleTheme,
        selectFilter,
        getFilteredExtensions
    }
}