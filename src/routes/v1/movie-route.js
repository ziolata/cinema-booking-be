import * as controller from "../../controllers/movie-controller.js";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../../middleware/authMiddleware.js";
import { AdminLogger } from "../../middleware/adminLog.js";
const routes = new Router();
routes.post("/add/", isAdmin, AdminLogger, controller.createMovieController);
routes.get("/", controller.getAllMovieController);
routes.get("/:id", controller.getMovieByIdController);
routes.delete(
	"/delete/:id",
	AdminLogger,
	isAdmin,
	controller.deleteMovieController,
);
routes.put(
	"/update/:id",
	isAdmin,
	AdminLogger,
	controller.updateMovieController,
);

export default routes;
