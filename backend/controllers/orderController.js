// const Order = require("../models/orderModel");

// // ⬇️ Step 2: Create order from selected calculation
// exports.createOrder = async (req, res) => {
//   try {
//     const { userId, calculationId } = req.body;

//     if (!userId || !calculationId) {
//       return res.status(400).json({ message: "userId & calculationId required" });
//     }

//     // 🔢 Find last order to generate next Order ID
//     const lastOrder = await Order.findOne().sort({ createdAt: -1 });
//     let nextNumber = 1;

//     if (lastOrder && lastOrder.orderId) {
//       const lastNumber = parseInt(lastOrder.orderId.replace("ML", ""));
//       if (!isNaN(lastNumber)) {
//         nextNumber = lastNumber + 1;
//       }
//     }

//     const newOrderId = "ML" + nextNumber.toString().padStart(4, "0");

//     const order = new Order({
//       user: userId,
//       calculationId,
//       orderId: newOrderId
//     });

//     await order.save();

//     res.status(201).json({ message: "Order created", order });
//   } catch (error) {
//     console.error("Order error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



// exports.getAllOrders = async (req, res) => {     
//   try {
//     const orders = await Order.find()
//       .populate("user", "name email")           // sirf name & email chahiye user ka
//       .populate("calculationId", "title result") // calculation ke kuch fields
//       .sort({ createdAt: -1 }); // latest orders pehle

//     res.status(200).json(orders);
//   } catch (error) {
//     console.error("Get Orders error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



const Order = require("../models/orderModel");
const Calculation = require("../models/calculationModel");  // ⬅️ Added import

// Step 2: Create order from selected calculation
exports.createOrder = async (req, res) => {
  try {
    const { userId, calculationId } = req.body;

    if (!userId || !calculationId) {
      return res.status(400).json({ message: "userId & calculationId required" });
    }

    // 🔍 Fetch calculation info
    const calculation = await Calculation.findById(calculationId);
    if (!calculation) {
      return res.status(404).json({ message: "Calculation not found" });
    }

    // 🔢 Find last order to generate next Order ID
    const lastOrder = await Order.findOne().sort({ createdAt: -1 });
    let nextNumber = 1;

    if (lastOrder && lastOrder.orderId) {
      const lastNumber = parseInt(lastOrder.orderId.replace("ML", ""));
      if (!isNaN(lastNumber)) {
        nextNumber = lastNumber + 1;
      }
    }

    const newOrderId = "ML" + nextNumber.toString().padStart(4, "0");

    const order = new Order({
      user: userId,
      calculationId,
      calculationDetails: calculation.toObject(), // ⬅️ storing full calculation snapshot
      orderId: newOrderId
    });

    await order.save();

    res.status(201).json({ message: "Order created", order });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")    // sirf name & email chahiye user ka
      .populate("calculationId", "title result") // calculation ke kuch fields
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get Orders error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
