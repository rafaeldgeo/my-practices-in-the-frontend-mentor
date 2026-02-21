import { loadProducts } from "./catalog.js";
import { createController } from "./controller/controller.js";
import { createModel } from "./model/model.js";
import { createView } from "./view/view.js";

async function bootstrap() {
    try {
        const catalogProducts = await loadProducts();
        const model = createModel();
        const controller = createController({catalog: catalogProducts, model});
        createView(controller);
        controller.init();
    } catch (error) {
        console.error("Erro to init the application", error.message);
    }
}

bootstrap();





