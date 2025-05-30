import * as controller from "../../controllers/user-controller.js";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../../middleware/authMiddleware.js";
const routes = new Router();
routes.put("/update/:id", isAuthenticated, controller.updateUserController);
routes.get("/", isAdmin, controller.getAllUserController);
routes.get("/:id", controller.getUserByIdController);
routes.post("/delete/:id", isAdmin, controller.deleteUserController);

export default routes;
