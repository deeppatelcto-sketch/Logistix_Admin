const Appointment = require('../models/appointmentSchema');
const Order = require('../models/orderSchema'); 

// 🟢 CREATE Appointment
exports.createAppointment = async (req, res) => {
  try {
    let userIdToAssign;

    // ✅ Client Flow
    if (req.user && req.user._id) {
      userIdToAssign = req.body.user || req.user._id;

      if (req.body.user && req.body.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "You cannot assign appointment to another user." });
      }
    } else {
      // ✅ Admin Flow
      if (!req.body.user) {
        return res.status(400).json({ message: "User ID is required for admin route." });
      }
      userIdToAssign = req.body.user;
    }

    const {
      lrNo, // 👈 this should match Order.orderId
      appointmentDate,
      startTime,
      endTime,
      appointmentId,
      poNumber,
      asn
    } = req.body;

    const poCopy = req.file ? `uploads/${req.file.filename}` : null;

    if (!lrNo || !appointmentDate || !startTime || !endTime || !poNumber || !asn || !poCopy) {
      return res.status(400).json({ message: 'All fields are required except Appointment ID' });
    }

    //  Duplicate LR No check in Appointment table
    const existing = await Appointment.findOne({ lrNo });
    if (existing) {
      return res.status(409).json({ message: 'Appointment already exists for this LR No' });
    }

    // ✅ Check Order table for valid (user + lrNo match)
    const validOrder = await Order.findOne({ user: userIdToAssign, orderId: lrNo });
    if (!validOrder) {
      return res.status(400).json({ message: "Invalid LR No: This LR No does not belong to the provided user" });
    }

    const newAppointment = await Appointment.create({
      lrNo,
      appointmentDate,
      startTime,
      endTime,
      appointmentId,
      poNumber,
      asn,
      poCopy,
      user: userIdToAssign,
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Create Appointment Error:', error);
    res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
};

// 📋 Admin: Get All
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("user").sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};

//  Client: Get My Appointments
exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching my appointments' });
  }
};

//  Get By ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    // Client cannot access others’ appointments
    if (req.user && appointment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointment' });
  }
};

//  UPDATE
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    // Only owner can update
    if (req.user && appointment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updateData = { ...req.body };
    if (req.file) {
      updateData.poCopy = `uploads/${req.file.filename}`;
    }

    // ✅ If user tries to change lrNo, validate with Order
    if (updateData.lrNo) {
      const validOrder = await Order.findOne({ user: appointment.user, orderId: updateData.lrNo });
      if (!validOrder) {
        return res.status(400).json({ message: "Invalid LR No: This LR No does not belong to the user" });
      }
    }

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({ message: 'Updated successfully', appointment: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment' });
  }
};

//  DELETE
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    // Only owner can delete
    if (req.user && appointment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await appointment.deleteOne();
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment' });
  }
};

// 📦 Get Orders by User
exports.getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // ⚡ Get all orders for that user
    const orders = await Order.find({ user: userId })
      .populate("calculationId", "title result")
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get Orders by User error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
