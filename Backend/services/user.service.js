// Function to creates a user in the database
import userModel from "../models/user.model.js";

export const CreateUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const hashedPassword = await userModel.hashpassword(password);
  const user = await userModel.create({
    email,
    password: hashedPassword,
  });
  return user;
};

