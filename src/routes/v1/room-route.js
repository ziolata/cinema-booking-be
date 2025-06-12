import * as controller from "../../controllers/room-controller.js";
import { Router } from "express";
import { isAdmin } from "../../middleware/authMiddleware.js";
import { AdminLogger } from "../../middleware/adminLog.js";
const routes = new Router();
routes.get("/", controller.getAllRoomController);
routes.get("/:id", controller.getRoomByIdController);
routes.post("/add/", isAdmin, AdminLogger, controller.createRoomController);
routes.delete(
	"/delete/:id",
	isAdmin,
	AdminLogger,
	controller.deleteRoomController,
);
routes.put("/update/:id", isAdmin, AdminLogger, controller.updateRoomtroller);

export default routes;
