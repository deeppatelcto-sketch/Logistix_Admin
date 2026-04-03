// Vercel serverless function handler
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mylogistix";

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
};

// Warm connection on cold start; also called in handlers below.
connectDB();

app.get("/api/health", async (req, res) => {
  await connectDB();
  res.json({
    status: "OK",
    message: "MyLogistix API is running",
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

try {
  const Routes = require("../backend/routes/route.js");
  const userRoutes = require("../backend/routes/userRoutes");
  const fileRoutes = require("../backend/routes/fileRoutes.js");
  const rateRoutes = require("../backend/routes/rateRoutes.js");
  const orderRoutes = require("../backend/routes/orderRoutes.js");
  const companyRateRoutes = require("../backend/routes/companyRateRoutes.js");

  app.use("/", Routes);
  app.use("/", userRoutes);
  app.use("/", fileRoutes);
  app.use("/", rateRoutes);
  app.use("/createorder", orderRoutes);
  app.use("/", companyRateRoutes);
} catch (error) {
  console.error("Error loading API routes:", error.message);
}

app.use((err, req, res, next) => {
  console.error("API error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "production" ? "Something went wrong" : err.message,
  });
});

app.use("*", (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

module.exports = app;