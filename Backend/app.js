// Created a express server
import express from "express";
const app = express();
import connectDB from "./db/db.js";

import userRoute from "./routes/user.route.js";

import dotenv from "dotenv";
// reads .env file
dotenv.config();

//  Parse incoming requests with JSON payloads
app.use(express.json());
// Parse incoming requests with URL-encoded payloads.
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", userRoute);

export default app;
