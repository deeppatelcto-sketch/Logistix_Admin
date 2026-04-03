const express = require("express");
const router = express.Router();
const { calculateRate } = require("../controllers/rateController");
const { createOrder,getAllOrders } = require("../controllers/orderController");

// Routes
router.post("/calculation", calculateRate); 
router.post("/order", createOrder);     
router.get("/allorders", getAllOrders);


module.exports = router;      

 


