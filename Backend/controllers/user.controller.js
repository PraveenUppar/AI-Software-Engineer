import userService from "../services/user.service.js";
import { validationResult } from "express-validator";

// This function validates the data and Call the function from the service to create a user and Generate JWT token
// To validate the data we use express-validator library

const createUserController = async (req, res) => {
  // Validate the data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Call the function from the service to create a user
  try {
    const user = await userService.CreateUser(req.body);
    // Generate JWT token
    const token = await user.generateJWT();
    res.status(201).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default createUserController;
