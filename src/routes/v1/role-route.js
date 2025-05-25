import * as controller from "../../controllers/role-controller.js";
import { Router } from "express";
const routes = new Router();
routes.post("/add", controller.createRoleController);

export default routes;
