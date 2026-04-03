// Orders API endpoint for Vercel
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Import order routes
const Routes = require("../backend/routes/route.js");
const orderRoutes = require("../backend/routes/orderRoutes.js");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mylogistix";

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
    });

// Routes
app.use("/", Routes);
app.use('/createorder', orderRoutes);

// Export for Vercel
module.exports = app;
