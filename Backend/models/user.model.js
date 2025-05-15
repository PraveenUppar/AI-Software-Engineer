import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// Async function for Hashing the password before saving the user
// Password hashing is CPU-intensive, and async/await prevents blocking the event loop.
userSchema.statics.hashpassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Async function to Compare the password with the hashed password for authentication
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate a JWT token for the user
userSchema.methods.generateToken = function () {
  return jwt.sign({ email: this.email}, process.env.JWT_SECRET);
};

export default mongoose.model("user", userSchema);
