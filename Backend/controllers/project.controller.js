import * as projectService from "../services/project.service.js";
import userModel from "../models/user.model.js";
import { validationResult } from "express-validator";

export const createProjectController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const {projectname} = req.body;
    const loggedInUser = await userModel.findOne({
      email: req.user.email,
    });
    const userId = loggedInUser._id;
    const newproject = await projectService.createProject({projectname, userId});
    return res
      .status(201)
      .json({ message: "Project created successfully", newproject });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
