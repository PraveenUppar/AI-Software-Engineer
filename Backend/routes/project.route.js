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

router.get(
  "/all",
  authMiddleware.userAuthMiddleware,
  projectController.getAllProjectsController
);

router.put(
  "/add-user",
  authMiddleware.userAuthMiddleware,
  body("projectId").isString().withMessage("Project ID is required"),
  body("users")
    .isArray({ min: 1 })
    .withMessage("Users must be an array of strings")
    .bail()
    .custom((users) => users.every((user) => typeof user === "string"))
    .withMessage("Each user must be a string"),
  projectController.addUserToProject
);

router.get(
  "/get-project/:projectId",
  authMiddleware.userAuthMiddleware,
  projectController.getProjectById
);

router.put(
  "/update-file-tree",
  authMiddleware.userAuthMiddleware,
  body("projectId").isString().withMessage("Project ID is required"),
  body("fileTree").isObject().withMessage("File tree is required"),
  projectController.updateFileTree
);

export default router;

