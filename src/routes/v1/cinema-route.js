import * as controller from "../../controllers/cinema-controller.js";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../../middleware/authMiddleware.js";
const routes = new Router();
routes.post("/add/", isAdmin, controller.createCinemaController);
routes.post("/delete/:id", isAdmin, controller.deleteCinemaController);
routes.put("/update/:id", isAdmin, controller.updateCinemaController);

export default routes;
