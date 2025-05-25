import * as controller from "../../controllers/room-controller.js";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../../middleware/authMiddleware.js";
const routes = new Router();
routes.get("/", controller.getAllRoomController);
routes.post("/add/", isAdmin, controller.createRoomController);
routes.post("/delete/:id", isAdmin, controller.deleteCinemaController);
routes.put("/update/:id", isAdmin, controller.updateRoomtroller);

export default routes;
