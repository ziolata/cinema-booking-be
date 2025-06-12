import * as controller from "../../controllers/ticket-controller.js";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../../middleware/authMiddleware.js";
import { AdminLogger } from "../../middleware/adminLog.js";
const routes = new Router();
routes.get("/", isAdmin, controller.getAllTicketController);
routes.get("/:id", isAuthenticated, controller.getTicketByIdController);
routes.put(
	"/update/:id",
	isAdmin,
	AdminLogger,
	controller.updateTicketController,
);
routes.delete(
	"/delete/:id",
	isAdmin,
	AdminLogger,
	controller.deleteTicketController,
);

export default routes;
