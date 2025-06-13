import * as controller from "../../controllers/user-controller.js";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../../middleware/authMiddleware.js";
import { AdminLogger } from "../../middleware/adminLog.js";
const routes = new Router();
routes.put("/update/me", isAuthenticated, controller.updateUserController);
routes.put(
	"/update/:id",
	isAdmin,
	AdminLogger,
	controller.updateUserController,
);
routes.get("/", isAdmin, controller.getAllUserController);
routes.get("/:id", controller.getUserByIdController);
routes.delete(
	"/delete/:id",
	isAdmin,
	AdminLogger,
	controller.deleteUserController,
);

export default routes;
