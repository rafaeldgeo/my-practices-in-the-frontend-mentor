import { loadProducts } from "./catalog.js";
import { createController } from "./controller/controller.js";

async function bootstrap() {
    try {
        const catalogProducts = await loadProducts();
        createController(catalogProducts);

    } catch (error) {
        console.error("Erro to init the application", error.message);
    }
}

bootstrap();





