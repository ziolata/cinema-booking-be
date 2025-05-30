import * as controller from "../../controllers/ticket_type-controller.js";
import { Router } from "express";
import { isAdmin } from "../../middleware/authMiddleware.js";
const routes = new Router();
routes.get("/", controller.getAllTicketTypeController);
routes.get("/:id", controller.getTicketTypeByIdController);
routes.post("/add/", isAdmin, controller.createTicketTypeController);
routes.post("/delete/:id", isAdmin, controller.deleteTicketTypeController);
routes.put("/update/:id", isAdmin, controller.updateTicketTypeController);

export default routes;
