import * as controller from "../../controllers/role-controller.js";
import { Router } from "express";
import { isAdmin} from "../../middleware/authMiddleware.js";

const routes = new Router();
routes.get("/", controller.getAllRoleController);
routes.get("/:id", controller.getRoleByIdController);
routes.post("/add/", isAdmin, controller.createRoleController);
routes.post("/delete/:id", isAdmin, controller.deleteRoleController);
routes.put("/update/:id", isAdmin, controller.updateRoleroller);

export default routes;
