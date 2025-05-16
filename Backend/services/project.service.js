import projectModel from "../models/project.model.js";

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
