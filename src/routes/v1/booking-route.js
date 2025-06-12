import * as controller from "../../controllers/booking-controller.js";
import { Router } from "express";
import {
	authorizeBookingUpdate,
	isAdmin,
	isAuthenticated,
} from "../../middleware/authMiddleware.js";
import { AdminLogger } from "../../middleware/adminLog.js";
const routes = new Router();
routes.post("/add", isAuthenticated, controller.createBookingController);
routes.get("/all", isAdmin, controller.getAllBookingController);
routes.get("/", isAuthenticated, controller.getAllBookingByUserController);
routes.delete(
	"/delete/:id",
	isAdmin,
	AdminLogger,
	controller.deleteBookingController,
);
routes.put(
	"/update/:id",
	authorizeBookingUpdate,
	AdminLogger,
	controller.updateBookingController,
);

export default routes;
