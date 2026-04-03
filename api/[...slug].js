// Vercel serverless function handler
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Import all routes
const userRoutes = require('../backend/routes/userRoutes');
const Routes = require("../backend/routes/route.js");
const fileRoutes = require("../backend/routes/fileRoutes.js");
const rateRoutes = require('../backend/routes/rateRoutes.js');
const orderRoutes = require("../backend/routes/orderRoutes.js");
const companyRateRoutes = require('../backend/routes/companyRateRoutes.js');

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
app.use('/', userRoutes);
app.use('/', fileRoutes);
app.use('/', rateRoutes);
app.use('/createorder', orderRoutes);
app.use('/', companyRateRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'MyLogistix API is running' });
});

// Export for Vercel
module.exports = app;
