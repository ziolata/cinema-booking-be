import * as controller from "../../controllers/ticket_type-controller.js";
import { Router } from "express";
import { isAdmin } from "../../middleware/authMiddleware.js";
import { AdminLogger } from "../../middleware/adminLog.js";
const routes = new Router();
routes.get("/", controller.getAllTicketTypeController);
routes.get("/:id", controller.getTicketTypeByIdController);
routes.post(
	"/add/",
	isAdmin,
	AdminLogger,
	controller.createTicketTypeController,
);
routes.delete(
	"/delete/:id",
	isAdmin,
	AdminLogger,
	controller.deleteTicketTypeController,
);
routes.put(
	"/update/:id",
	isAdmin,
	AdminLogger,
	controller.updateTicketTypeController,
);

export default routes;
