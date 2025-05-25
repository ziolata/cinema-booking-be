import * as controller from "../../controllers/booking-controller.js";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../../middleware/authMiddleware.js";
const routes = new Router();
routes.post("/add/", isAuthenticated, controller.createBookingController);
routes.post("/delete/:id", isAdmin, controller.deleteBookingController);
routes.put("/update/:id", isAdmin, controller.updateBookingController);

export default routes;
