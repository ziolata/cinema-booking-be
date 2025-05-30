import * as controller from "../../controllers/room-controller.js";
import { Router } from "express";
import { isAdmin } from "../../middleware/authMiddleware.js";
const routes = new Router();
routes.get("/", controller.getAllRoomController);
routes.get("/:id", controller.getRoomByIdController);
routes.post("/add/", isAdmin, controller.createRoomController);
routes.post("/delete/:id", isAdmin, controller.deleteRoomController);
routes.put("/update/:id", isAdmin, controller.updateRoomtroller);

export default routes;
