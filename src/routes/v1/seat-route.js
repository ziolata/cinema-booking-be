import * as controller from "../../controllers/seat-controller.js";
import { Router } from "express";
import { isAdmin } from "../../middleware/authMiddleware.js";
import { AdminLogger } from "../../middleware/adminLog.js";
const routes = new Router();
routes.get("/", controller.getAllSeatController);
routes.get("/:id", controller.getSeatByIdController);
routes.post("/add/", isAdmin, AdminLogger, controller.createSeatController);
routes.post(
	"/add/many",
	isAdmin,
	AdminLogger,
	controller.createManySeatController,
);
routes.delete(
	"/delete/:id",
	isAdmin,
	AdminLogger,
	controller.deleteSeatController,
);
routes.put(
	"/update/:id",
	isAdmin,
	AdminLogger,
	controller.updateSeatController,
);

export default routes;
