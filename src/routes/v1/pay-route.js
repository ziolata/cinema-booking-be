import * as controller from "../../controllers/pay-controller.js";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../../middleware/authMiddleware.js";

const routes = new Router();

routes.post(
	"/create_payment",
	isAuthenticated,
	controller.createPaymentController,
);
routes.get("/vnpay_return", controller.getPaymentController);

export default routes;
