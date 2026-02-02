export async function loadProducts() {
    const DATA_SOURCE = "src/js/data.json";
    try {
        const response = await fetch(DATA_SOURCE);

        if (!response.ok) {
            throw new Error(`Erro in request: ${response.status}`)
        }

        const products = await response.json();
        return products;

    } catch (erro) {
        throw new Error(`It's not working ${erro.message}`);
    }
}

