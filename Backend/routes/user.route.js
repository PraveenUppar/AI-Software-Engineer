import Router from "express";
import * as userController from "../controllers/user.controller.js";
import { body } from "express-validator";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password"),
  userController.createUserController
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password"),
  userController.loginUserController
);

router.get("/logout", userController.logoutUserController);

router.get(
  "/profile",
  authMiddleware.userAuthMiddleware,
  userController.profileUserController
);

export default router;
