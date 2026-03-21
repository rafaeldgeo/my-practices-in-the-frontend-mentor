export function createModel() {
    console.log("model criado");

    state = {
        extensions: [],     // domínio
        filter: 'all',      // UI
        theme: 'light',     // UI
        status: 'idle'      // UI (loading state)
    }
}