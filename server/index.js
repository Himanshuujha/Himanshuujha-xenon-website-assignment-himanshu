import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listingitemroutes.js";
import path from "path";
import cors from "cors"

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err); // Log full error
  });

  
  
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());

const PORT = process.env.PORT || 5000; // Default to 5000 if process.env.PORT is not set
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// Serve static files from the 'client/dist' directory
app.use(express.static(path.resolve("client", "dist")));

// Catch-all for handling SPA routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve("client", "dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
