import * as controller from "../../controllers/genre-controller.js";
import { Router } from "express";
import { isAdmin } from "../../middleware/authMiddleware.js";
const routes = new Router();
routes.post("/add/", isAdmin, controller.createGenreController);
routes.get("/", controller.getAllGenreController)
routes.get("/:id", controller.getGenreByIdController)
routes.post("/delete/:id", isAdmin, controller.deleteGenreController);
routes.put("/update/:id", isAdmin, controller.updateGenreController);

export default routes;
