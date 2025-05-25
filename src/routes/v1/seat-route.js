import * as controller from "../../controllers/seat-controller.js";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../../middleware/authMiddleware.js";
const routes = new Router();
routes.post("/add/", isAdmin, controller.createSeatController);
routes.post("/add/many", isAdmin, controller.createManySeatController);
routes.post("/delete/:id", isAdmin, controller.deleteSeatController);
routes.put("/update/:id", isAdmin, controller.updateSeatController);

export default routes;
