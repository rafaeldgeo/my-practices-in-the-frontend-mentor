import { createModel } from "./model/model.js";
import { createController } from "./controller/controller.js";
import { createView } from "./view/view.js";

function bootstrap(){
    const model = createModel();
    const controller = createController(model);
    const view = createView(controller);
}

bootstrap()