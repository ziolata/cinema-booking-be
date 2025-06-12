import * as controller from "../../controllers/genre-controller.js";
import { Router } from "express";
import { isAdmin } from "../../middleware/authMiddleware.js";
import { AdminLogger } from "../../middleware/adminLog.js";
const routes = new Router();
routes.post("/add/", isAdmin, AdminLogger, controller.createGenreController);
routes.get("/", controller.getAllGenreController);
routes.get("/:id", controller.getGenreByIdController);
routes.delete(
	"/delete/:id",
	isAdmin,
	AdminLogger,
	controller.deleteGenreController,
);
routes.put(
	"/update/:id",
	isAdmin,
	AdminLogger,
	controller.updateGenreController,
);

export default routes;
