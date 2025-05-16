import Router from "express";
import * as projectController from "../controllers/project.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";
import { body } from "express-validator";

const router = Router();

router.post(
  "/create",
  authMiddleware.userAuthMiddleware,
  body("projectname").isString().withMessage('Name is required'),
  projectController.createProjectController
);

export default router;

