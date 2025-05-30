import * as controller from "../../controllers/showtime-controller.js";
import { Router } from "express";
import { isAdmin } from "../../middleware/authMiddleware.js";
const routes = new Router();
routes.get("/", controller.getAllShowtimeController);
routes.get("/:id", controller.getShowtimeByIdController);
routes.post("/add/", isAdmin, controller.createShowtimeController);
routes.post("/delete/:id", isAdmin, controller.deleteShowtimeController);
routes.put("/update/:id", isAdmin, controller.updateShowtimeController);

export default routes;
