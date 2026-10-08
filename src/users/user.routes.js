import { Router } from "express";

import {
  createUserController,
  deleteUserController,
  getUserByIdController,
  getUserController,
  updateUserController,
} from "./user.controller.js";
const router = Router();

router.get("/", getUserController);
router.get("/:id", getUserByIdController); //
router.post("/", createUserController);
// update, delete, get by id
// proper success, error and api response, middleware routesnotfound errorr handle
router.patch("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export { router };
