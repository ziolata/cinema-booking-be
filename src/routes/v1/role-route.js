import * as controller from "../../controllers/role-controller.js";
import { Router } from "express";
import { isAdmin } from "../../middleware/authMiddleware.js";
import { AdminLogger } from "../../middleware/adminLog.js";

const routes = new Router();
routes.get("/", controller.getAllRoleController);
routes.get("/:id", controller.getRoleByIdController);
routes.post("/add/", isAdmin, AdminLogger, controller.createRoleController);
routes.delete(
	"/delete/:id",
	isAdmin,
	AdminLogger,
	controller.deleteRoleController,
);
routes.put("/update/:id", isAdmin, AdminLogger, controller.updateRoleroller);

export default routes;
