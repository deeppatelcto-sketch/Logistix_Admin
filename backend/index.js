// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const path = require('path');

// // Load environment variables before anything else
// dotenv.config();

// const app = express();
// const userRoutes = require('./routes/userRoutes');
// const Routes = require("./routes/route.js");
// const fileRoutes = require("./routes/fileRoutes.js")
// const rateRoutes =require('./routes/rateRoutes.js')
// const orderRoutes = require("./routes/orderRoutes.js");
// const companyRateRoutes = require('./routes/companyRateRoutes.js')

// const PORT =  8000;
// const MONGO_URI = process.env.MONGO_URI;

// // Debugging: Check if MONGO_URL is being loaded

// if (!MONGO_URI) {
//     console.error("❌ Error: MONGO_URL is undefined. Check your .env file.");
//     process.exit(1); // Stop execution if MONGO_URL is missing
// }

// app.use('/invoices', express.static(path.join(__dirname, 'invoices')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// // app.use(cors({ origin: 'http://localhost:3000' }));


// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// // Connect to MongoDB
// mongoose
//     .connect(MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => console.log("✅ Connected to MongoDB"))
//     .catch((err) => {
//         console.error("❌ MongoDB Connection Error:", err);
//         process.exit(1); // Stop execution on database connection failure
//     });



// // Health check route
// app.get('/', (req, res) => {
//     res.json({ 
//         status: 'OK', 
//         message: 'MyLogistix API is running',
//         timestamp: new Date().toISOString(),
//         environment: process.env.NODE_ENV || 'development'
//     });
// });

// // API health check
// app.get('/api/health', (req, res) => {
//     res.json({ 
//         status: 'OK', 
//         message: 'MyLogistix API is running',
//         timestamp: new Date().toISOString(),
//         environment: process.env.NODE_ENV || 'development'
//     });
// });

// // Routes
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use("/", Routes);
// app.use('/', userRoutes);
// app.use('/', fileRoutes);
// app.use('/', rateRoutes);
// app.use('/createorder', orderRoutes);
// app.use('/',companyRateRoutes);


// // Start Server
// app.listen(PORT, '0.0.0.0', () => {
//     console.log(`🚀 Server is starting on port ${PORT}`);         
// });




const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path');

//Load environment variables before anything else
dotenv.config();

const app = express();
const userRoutes = require('./routes/userRoutes');
const Routes = require("./routes/route.js");
const fileRoutes = require("./routes/fileRoutes.js");
const rateRoutes = require('./routes/rateRoutes.js');
const orderRoutes = require("./routes/orderRoutes.js");
const companyRateRoutes = require('./routes/companyRateRoutes.js');

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

// Debugging: Check if MONGO_URL is being loaded
if (!MONGO_URI) {
    console.error("Error: mongodb url is undefinded, please check your url and your .env file. ");
    process.exit(1); // Stop execution if MONGO_URL is missing
}

// Serve static files
app.use('/invoices', express.static(path.join(__dirname, 'invoices')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.options("*", cors());

//Updated CORS configuration for your frontend
// app.use(cors({
//     origin: [
//         "https://frontend-mu-sandy-62.vercel.app", 
//         "http://localhost:3000" 
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     credentials: true
// }));

//Connect to MongoDB
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("MongoDB Connection Error:", err);
        process.exit(1); // Stop execution on database connection failure
    });

//Health check routes
app.get('/', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'MyLogistix API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

app.get('/api/health', (req, res) => {           
    res.json({ 
        status: 'OK', 
        message: 'MyLogistix API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development' 
    });
});

//API Routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/", Routes);
app.use('/', userRoutes);
app.use('/', fileRoutes);
app.use('/', rateRoutes);
app.use('/createorder', orderRoutes);
app.use('/', companyRateRoutes);

//Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});