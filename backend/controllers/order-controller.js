

// const Order = require('../models/orderSchema');


// exports.createOrder = async (req, res) => {
//   try {
//     const {
//       pickupPincode,
//       deliveryPincode,
//       weight,
//       qty,
//       length,
//       width,
//       height,
//       paymentMode,
//       invoiceValue,
//       insurance ,
//       appointmentDelivery ,
//       selectedCourierCompany,
//       finalRate,
//       zone,
//       status
//     } = req.body;

//     // ✅ Auto-generate LR/AWB No like "LR00001"
//     const lastOrder = await Order.findOne().sort({ createdAt: -1 });
//     let nextNumber = 1;

//     if (lastOrder && lastOrder.orderId) {
//       const lastNumber = parseInt(lastOrder.orderId.replace("LR", ""));
//       nextNumber = lastNumber + 1;
//     }

//     const orderId = "LR" + nextNumber.toString().padStart(5, "0");

//     const newOrder = new Order({
//       pickupPincode,
//       deliveryPincode,
//       weight,
//       qty,
//       length,
//       width,
//       height,
//       paymentMode,
//       invoiceValue,
//       insurance,
//       appointmentDelivery,
//       selectedCourierCompany,
//       finalRate,
//       zone,
//       status,
//       orderId, // ✅ Set generated orderId here
//     });

//     await newOrder.save();
//     res.status(201).json({ message: 'Order created successfully', order: newOrder });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal error' });
//   }
// };




// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch orders' });
//   }
// };                                                                                             

// // 🟣 Get single order by ID
// exports.getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: 'Order not found' });
//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch order' });
//   }
// };

// // 🟠 Update order by ID
// exports.updateOrder = async (req, res) => {
//   try {
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
//     res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to update order' });
//   }
// };

// // 🔴 Delete order by ID
// exports.deleteOrder = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: 'Order not found' });

//     await order.deleteOne();
//     res.status(200).json({ message: 'Order deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to delete order' });
//   }
// };

// // 🟢 Get total order count
// // exports.getOrderCount = async (req, res) => {
// //   try {
// //     const count = await Order.countDocuments();
// //     res.status(200).json({ count });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Failed to fetch order count' });
// //   }
// // };

// exports.getOrderCount = async (req, res) => {
//   try {
//     // 🔹 Status-wise counts
//     const orderCounts = await Order.aggregate([
//       {
//         $group: {
//           _id: "$status",
//           count: { $sum: 1 }
//         }
//       }
//     ]);

//     // 🔹 Convert array to object
//     const statusCounts = orderCounts.reduce((acc, curr) => {
//       acc[curr._id] = curr.count;
//       return acc;
//     }, {});

//     // 🔹 Get total orders
//     const totalOrders = await Order.countDocuments();

//     res.status(200).json({
//       total: totalOrders,
//       pending: statusCounts.pending || 0,
//       readytoship: statusCounts.readytoship || 0,
//       shipped: statusCounts.shipped || 0,
//       delivered: statusCounts.delivered || 0,
//       cancelled: statusCounts.cancelled || 0,
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to fetch order count' });
//   }
// };

// // 🟡 Update only the status of an order
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     // ✅ Valid status values
//     const allowedStatuses = ['pending', 'ready to ship', 'shipped', 'delivered', 'cancelled'];
//     if (!allowedStatuses.includes(status)) {
//       return res.status(400).json({ message: 'Invalid status value' });
//     }

//     // 🔄 Update status only
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     res.status(200).json({
//       message: 'Order status updated successfully',
//       order: updatedOrder
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to update order status' });
//   }
// };





//controllers/orderController.js
const Order = require("../models/orderSchema");    

//Function to generate next LR No
const generateOrderId = async () => {
  const lastOrder = await Order.findOne().sort({ createdAt: -1 });
  let nextNumber = 1;

  if (lastOrder && lastOrder.orderId) {
    const lastNumber = parseInt(lastOrder.orderId.replace("LR", ""), 10);
    if (!isNaN(lastNumber)) {
      nextNumber = lastNumber + 1;
    }
  }

  return "LR" + nextNumber.toString().padStart(5, "0");
};

//Create Order (Client + Admin)
exports.createOrder = async (req, res) => {
  try {
    let userIdToAssign;

    if (req.user && req.user._id) {
      // ✅ Client flow
      userIdToAssign = req.body.user || req.user._id;

      if (req.body.user && req.body.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          message: "You are not allowed to assign order to another user.",
        });
      }
    } else {
      // ✅ Admin flow
      if (!req.body.user) {
        return res.status(400).json({ message: "User ID is required." });
      }
      userIdToAssign = req.body.user;
    }

    const orderId = await generateOrderId();

    const newOrder = await Order.create({
      ...req.body,
      user: userIdToAssign,
      orderId,
    });

    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//Get All Orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Current User's Orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get One Order
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update Order
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete Order
// exports.deleteOrder = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: "Order not found" });

   
//     await order.deleteOne();
//     res.status(200).json({ message: "Order deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.deleteOne();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Delete Order Error:", error);
    res.status(500).json({ message: error.message });
  }
};


//Get Order Counts
exports.getOrderCount = async (req, res) => {
  try {
    const orderCounts = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const statusCounts = orderCounts.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    const totalOrders = await Order.countDocuments();

    res.status(200).json({
      total: totalOrders,
      pending: statusCounts.pending || 0,
      readytoship: statusCounts.readytoship || 0,
      shipped: statusCounts.shipped || 0,
      delivered: statusCounts.delivered || 0,
      cancelled: statusCounts.cancelled || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update Only Status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['pending', 'readytoship', 'shipped', 'delivered', 'cancelled'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// ===============================
// DASHBOARD DATA (ADMIN)
// ===============================
exports.getDashboardStats = async (req, res) => {
  try {
    // ===============================
    // 1️⃣ REVENUE SUMMARY
    // ===============================
    const revenueAgg = await Order.aggregate([
      {
        $group: {
          _id: "$paymentMode",
          amount: { $sum: "$finalRate" }
        }
      }
    ]);

    let revenue = {
      totalRevenue: 0,
      prepaid: 0,
      cod: 0,
      toPay: 0
    };

    revenueAgg.forEach(item => {
      revenue.totalRevenue += item.amount || 0;

      if (item._id === "prepaid") revenue.prepaid += item.amount || 0;
      if (item._id === "cod") revenue.cod += item.amount || 0;
      if (item._id === "to pay") revenue.toPay += item.amount || 0;
    });

    // ===============================
    // 2️⃣ ORDER PERFORMANCE
    // ===============================
    const statusAgg = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    let orderPerformance = {
      manifested: 0,
      inTransit: 0,
      pending: 0,
      delivered: 0,
      rto: 0
    };

    statusAgg.forEach(s => {
      if (s._id === "readytoship") orderPerformance.manifested = s.count;
      if (s._id === "shipped") orderPerformance.inTransit = s.count;
      if (s._id === "pending") orderPerformance.pending = s.count;
      if (s._id === "delivered") orderPerformance.delivered = s.count;
      if (s._id === "cancelled") orderPerformance.rto = s.count;
    });

    // ===============================
    // 3️⃣ WEIGHT SUMMARY
    // ===============================
    const getWeight = async (days) => {
      const date = new Date();
      date.setDate(date.getDate() - days);

      const res = await Order.aggregate([
        { $match: { createdAt: { $gte: date } } },
        {
          $group: {
            _id: null,
            totalWeight: { $sum: "$weight" }
          }
        }
      ]);

      return res[0]?.totalWeight || 0;
    };

    const weightSummary = {
      thisWeek: await getWeight(7),
      thisMonth: await getWeight(30),
      last3Month: await getWeight(90),
      last6Month: await getWeight(180)
    };

    // ===============================
    // 4️⃣ ZONE WISE WEIGHT
    // ===============================
    const zoneAgg = await Order.aggregate([
      {
        $group: {
          _id: "$zone",
          totalWeight: { $sum: "$weight" }
        }
      }
    ]);

    let zoneWeight = {
      north: 0,
      south: 0,
      east: 0,
      west: 0,
      flight: 0
    };

    zoneAgg.forEach(z => {
      if (!z._id) return;
      const key = z._id.toLowerCase();
      if (zoneWeight[key] !== undefined) {
        zoneWeight[key] += z.totalWeight;
      }
    });

    // ===============================
    // FINAL RESPONSE
    // ===============================
    res.status(200).json({
      revenue,
      orderPerformance,
      weightSummary,
      zoneWeight
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: error.message });
  }
};



























































