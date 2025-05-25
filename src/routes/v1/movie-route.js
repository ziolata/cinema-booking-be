import * as controller from "../../controllers/movie-controller.js";
import { Router } from "express";
import { isAdmin, isAuthenticated } from "../../middleware/authMiddleware.js";
const routes = new Router();
routes.post("/add/", isAdmin, controller.createMovieController);
routes.post("/delete/:id", isAdmin, controller.deleteMovieController);
routes.put("/update/:id", isAdmin, controller.updateMovieController);

export default routes;
