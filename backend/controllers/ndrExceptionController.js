

const NdrException = require('../models/ndrExceptionSchema');
const Order = require('../models/orderSchema');

// ✅ Create NDR entry
exports.createNdrException = async (req, res) => {
  try {
    const { orderId, reason, lastUpdate, attempts, actionTaken } = req.body;

    const order = await Order.findById(orderId).populate("user");
    if (!order) return res.status(404).json({ message: "Order not found" });

    const existing = await NdrException.findOne({ orderId });
    if (existing) return res.status(400).json({ message: "NDR already exists for this order" });

    const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newNdr = new NdrException({
      orderId,
      date,
      lastUpdate,
      reason,
      attempts,
      mode: order.paymentMode,
      actionTaken,
      user: order.user._id,   // ✅ store user from order
    });

    await newNdr.save();
    res.status(201).json({ message: "NDR entry created", data: newNdr });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get all NDRs (Admin)
exports.getAllNdrExceptions = async (req, res) => {
  try {
    const list = await NdrException.find()
      .populate("orderId", "orderId")  // just LR number
      .populate("user", "name email"); // show user info
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch NDRs" });
  }
};

// ✅ Get NDRs for logged-in User
exports.getUserNdrExceptions = async (req, res) => {
  try {
    const list = await NdrException.find({ user: req.user._id })
      .populate("orderId", "orderId")
      .populate("user", "name email");
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch NDRs for user" });
  }
};

// ✅ Update action taken
exports.updateNdrException = async (req, res) => {
  try {
    const id = req.params.id;

    if (req.body.orderId) {
      const existing = await NdrException.findOne({
        orderId: req.body.orderId,
        _id: { $ne: id }
      });

      if (existing) {
        return res.status(400).json({
          message: "NDR already exists for this order. Please choose a different order."
        });
      }
    }

    const updated = await NdrException.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "NDR entry not found" });
    }

    res.status(200).json(updated);

  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: errors[0] });
    }

    res.status(500).json({ message: "Error updating NDR", error: err.message });
  }
};

// ✅ Delete NDR
exports.deleteNdrException = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await NdrException.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "NDR not found" });

    res.status(200).json({ message: "NDR deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete" });
  }
};

