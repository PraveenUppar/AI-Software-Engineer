import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";

// This function validates the data and Call the function from the service to create a user and Generate JWT token
// To validate the data we use express-validator library

export const createUserController = async (req, res) => {
  // Validate the data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Call the function from the service to create a user
  try {
    const user = await userService.CreateUser(req.body);
    // Generate JWT token
    const token = await user.generateToken();
    res.status(201).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginUserController = async (req, res) => {
  // Validate the data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Call the function from the service to login a user
  try {
    const user = await userService.LoginUser(req.body);
    // Generate JWT token
    const token = await user.generateToken();
    res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logoutUserController = async (req, res) => {
  // Logout the user by removing the token from the database
  res.status(200).json({ message: "Logged out successfully" });
};

export const profileUserController = async (req, res) => {
  res.status(200).json({ user: req.user });
};


export const getAllUsersController = async (req, res) => {
  try {
    const loggedInUser = await userModel.findOne({
      email: req.user.email,
    });

    const allUsers = await userService.getAllUsers({
      userId: loggedInUser._id,
    });

    return res.status(200).json({
      users: allUsers,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({ error: err.message });
  }
};