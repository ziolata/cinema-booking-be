import * as controller from "../../controllers/user-controller.js";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../../middleware/authMiddleware.js";
const routes = new Router();
routes.put("/update/", isAdmin, controller.updateProfileController);

export default routes;
