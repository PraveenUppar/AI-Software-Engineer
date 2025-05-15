import Router from "express";
import * as userController from "../controllers/user.controller.js";
import {body} from "express-validator";

const router = Router();

router.post(
  "/register",
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password"),
  userController.createUserController
);

export default router;
