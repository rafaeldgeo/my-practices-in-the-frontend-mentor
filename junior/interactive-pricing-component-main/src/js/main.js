import { createController } from "./controller/controller.js";
import { createModel } from "./model/model.js";
import { createView } from "./view/view.js";

function bootstrap() {
    try {
        const model = createModel();
        const controller = createController(model);
        createView(controller);
        controller.init();
    } catch (error) {
        console.error("Erro to init the application", error.message);
    }
}

bootstrap();