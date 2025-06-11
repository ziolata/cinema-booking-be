import * as controller from "../../controllers/booking-controller.js";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../../middleware/authMiddleware.js";
const routes = new Router();
routes.post("/add", isAuthenticated, controller.createBookingController);
routes.get("/all", isAdmin, controller.getAllBookingController);
routes.get("/", isAuthenticated, controller.getAllBookingByUserController);
routes.post("/delete/:id", isAdmin, controller.deleteBookingController);
routes.put("/update/:id", isAdmin, controller.updateBookingController);

export default routes;
