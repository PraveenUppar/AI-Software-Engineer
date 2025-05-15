// Created a express server
import express from "express";
import connectDB from "./db/db.js";
import userRoute from "./routes/user.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import redisClient from "./services/redis.service.js";
import cors from "cors";

const app = express();

// reads .env file
dotenv.config();
//  Parse incoming requests with JSON payloads
app.use(express.json());
// Parse incoming requests with URL-encoded payloads.
app.use(express.urlencoded({ extended: true }));
// Parse cookies from the request
app.use(cookieParser());
// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
connectDB();

// Demo route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Route realted to user login and logout
app.use("/user", userRoute);

export default app;
