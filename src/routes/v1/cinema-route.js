import * as controller from "../../controllers/cinema-controller.js";
import { Router } from "express";
import { isAdmin } from "../../middleware/authMiddleware.js";
import { AdminLogger } from "../../middleware/adminLog.js";
const routes = new Router();
routes.post("/add/", isAdmin, AdminLogger, controller.createCinemaController);
routes.get("/", controller.getAllCinemaController);
routes.get("/:id", controller.getCinemaByIdController);
routes.delete(
	"/delete/:id",
	isAdmin,
	AdminLogger,
	controller.deleteCinemaController,
);
routes.put(
	"/update/:id",
	isAdmin,
	AdminLogger,
	controller.updateCinemaController,
);

export default routes;
