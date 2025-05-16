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

export const getAllProjectsController = async (req, res) => { 
  try {
    const loggedInUser = await userModel.findOne({
      email: req.user.email,
    });
    const userId = loggedInUser._id;
    const projects = await projectService.getAllProjects(userId);
    return res.status(200).json({ message: "Projects fetched successfully", projects });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export const addUserToProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { projectId, users } = req.body;
    const loggedInUser = await userModel.findOne({
      email: req.user.email,
    });
    const project = await projectService.addUsersToProject({
      projectId,
      users,
      userId: loggedInUser._id,
    });
    return res.status(200).json({
      project,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export const getProjectById = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await projectService.getProjectById({ projectId });

    return res.status(200).json({
      project,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export const updateFileTree = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { projectId, fileTree } = req.body;

    const project = await projectService.updateFileTree({
      projectId,
      fileTree,
    });

    return res.status(200).json({
      project,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};