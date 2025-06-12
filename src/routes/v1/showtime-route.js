import * as controller from "../../controllers/showtime-controller.js";
import { Router } from "express";
import { isAdmin } from "../../middleware/authMiddleware.js";
import { AdminLogger } from "../../middleware/adminLog.js";
const routes = new Router();
routes.get("/", controller.getAllShowtimeController);
routes.get("/:id", controller.getShowtimeByIdController);
routes.post("/add/", isAdmin, AdminLogger, controller.createShowtimeController);
routes.delete(
	"/delete/:id",
	AdminLogger,
	isAdmin,
	controller.deleteShowtimeController,
);
routes.put(
	"/update/:id",
	isAdmin,
	AdminLogger,
	controller.updateShowtimeController,
);

export default routes;
