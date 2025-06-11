import * as controller from "../../controllers/ticket-controller.js";
import { Router } from "express";
import { isAdmin } from "../../middleware/authMiddleware.js";
const routes = new Router();
routes.get("/", isAdmin, controller.getAllTicketController);

export default routes;
