export function createModel() {

    const state = {
        extensions: [],   // domínio
        filter: 'all',    // UI
        theme: 'light',   // UI
        status: 'idle'    // UI
    }

    let observers = [];

    function subscribe(observerFn) {
        observers.push(observerFn);
    }

    function notify() {
        observers.forEach((observer) => observer(state));
    }

    async function loadExtensions() {
        const DATA_SOURCE = "../assets/data/data.json";
        try {
            state.status = "loading";
            notify();
            
            const response = await fetch(DATA_SOURCE);

            if (!response.ok) {
                throw new Error(`Erro in request: ${response.status}`);
            }

            const datas = await response.json();
            state.status = "success";
            state.extensions = datas.map((rawExtensions) => {
                return {
                    ...rawExtensions,
                    id: crypto.randomUUID()
                }
            });
            notify();

        } catch (error) {
            state.status = "error";
            notify();
        }
    }

    function toggleTheme() {
        state.theme = state.theme === "light" ? "dark" : "light";
        notify();
    }

    function selectFilter(filterSelected) {
        state.filter = filterSelected;
        notify();
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

    function removeExtension(id) {
        state.extensions = state.extensions.filter((extension) => extension.id !== id);
        notify();
    }

    function toggleStatusExtension(id) {
        state.extensions = state.extensions.map((extension) => {
            if (extension.id === id) {
                return {
                    ...extension,
                    isActive: !extension.isActive
                }
            } else {
                return extension;
            }
        });
        notify();
    }

    return {
        subscribe,
        loadExtensions,
        toggleTheme,
        selectFilter,
        getFilteredExtensions,
        removeExtension,
        toggleStatusExtension
    }
}