import projectModel from "../models/project.model.js";
import mongoose from "mongoose";

export const createProject = async ({ projectname, userId }) => {
  if (!projectname) {
    throw new Error("Project name is required");
  }
  if (!userId) {
    throw new Error("User ID is required");
  }
  const project = await projectModel.create({ projectname, users: [userId] });
  return project;
};

export const getAllProjects = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  const projects = await projectModel
    .find({ users: userId })
    .populate("users", "name email");
  return projects;
};

export const addUsersToProject = async ({ projectId, users, userId }) => {
  if (!projectId) {
    throw new Error("projectId is required");
  }
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid projectId");
  }
  if (!users) {
    throw new Error("users are required");
  }
  if (
    !Array.isArray(users) ||
    users.some((userId) => !mongoose.Types.ObjectId.isValid(userId))
  ) {
    throw new Error("Invalid userId(s) in users array");
  }
  if (!userId) {
    throw new Error("userId is required");
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid userId");
  }
  const project = await projectModel.findOne({
    _id: projectId,
    users: userId,
  });
  console.log(project);
  if (!project) {
    throw new Error("User not belong to this project");
  }
  const updatedProject = await projectModel.findOneAndUpdate(
    {
      _id: projectId,
    },
    {
      $addToSet: {
        users: {
          $each: users,
        },
      },
    },
    {
      new: true,
    }
  );
  return updatedProject;
};

export const getProjectById = async ({ projectId }) => {
  if (!projectId) {
    throw new Error("projectId is required");
  }
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid projectId");
  }
  const project = await projectModel
    .findOne({
      _id: projectId,
    })
    .populate("users");

  return project;
};

export const updateFileTree = async ({ projectId, fileTree }) => {
  if (!projectId) {
    throw new Error("projectId is required");
  }
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid projectId");
  }
  if (!fileTree) {
    throw new Error("fileTree is required");
  }
  const project = await projectModel.findOneAndUpdate(
    {
      _id: projectId,
    },
    {
      fileTree,
    },
    {
      new: true,
    }
  );
  return project;
};
