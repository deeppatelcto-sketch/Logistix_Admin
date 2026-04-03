// const PickupPoint = require('../models/pickupPointSchema');

// // Create
// exports.createPickupPoint = async (req, res) => {
//   try {
//     const pickup = await PickupPoint.create(req.body);
//     res.status(201).json(pickup);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Read all
// exports.getAllPickupPoints = async (req, res) => {
//   try {
//     const pickups = await PickupPoint.find().sort({ createdAt: -1 });
//     res.status(200).json(pickups);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update
// exports.updatePickupPoint = async (req, res) => {
//   try {
//     const pickup = await PickupPoint.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.status(200).json(pickup);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Delete
// exports.deletePickupPoint = async (req, res) => {
//   try {
//     await PickupPoint.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Pickup point deleted' });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Toggle status
// exports.toggleStatus = async (req, res) => {
//   try {
//     const pickup = await PickupPoint.findById(req.params.id);
//     pickup.status = !pickup.status;
//     await pickup.save();
//     res.status(200).json(pickup);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };



const PickupPoint = require('../models/pickupPointSchema');

// 🟢 Create Pickup Point (Client or Admin)
exports.createPickupPoint = async (req, res) => {
  try {
    let userIdToAssign;

    // ✅ If token present (client)
    if (req.user && req.user._id) {
      userIdToAssign = req.body.user || req.user._id;

      // 🚫 Prevent assigning someone else's ID
      if (req.body.user && req.body.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          message: "You are not allowed to assign pickup point to another user.",
        });
      }
    } else {
      // ✅ Admin route (no token)
      if (!req.body.user) {
        return res.status(400).json({ message: "User ID is required." });
      }
      userIdToAssign = req.body.user;
    }

    const newPickupPoint = await PickupPoint.create({
      ...req.body,
      user: userIdToAssign,
    });

    res.status(201).json(newPickupPoint);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 📋 Get All Pickup Points (Admin)
exports.getAllPickupPoints = async (req, res) => {
  try {
    const pickups = await PickupPoint.find().sort({ createdAt: -1 });
    res.status(200).json(pickups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📋 Get Logged-in User's Pickup Points
exports.getMyPickupPoints = async (req, res) => {
  try {
    const pickups = await PickupPoint.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(pickups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔍 Get One (only owner)
exports.getPickupPointById = async (req, res) => {
  try {
    const pickup = await PickupPoint.findById(req.params.id);
    if (!pickup) return res.status(404).json({ message: 'Not found' });

    if (pickup.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json(pickup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✏️ Update (Admin OR Owner)
exports.updatePickupPoint = async (req, res) => {
  try {
    const pickup = await PickupPoint.findById(req.params.id);
    if (!pickup) return res.status(404).json({ message: 'Not found' });

    // ✅ Only check ownership if user is logged in
    if (req.user && pickup.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedPickup = await PickupPoint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPickup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ❌ Delete (Admin OR Owner)
exports.deletePickupPoint = async (req, res) => {
  try {
    const pickup = await PickupPoint.findById(req.params.id);
    if (!pickup) return res.status(404).json({ message: 'Not found' });

    // ✅ Only check ownership if user is logged in
    if (req.user && pickup.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await pickup.deleteOne();
    res.status(200).json({ message: 'Pickup point deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🔄 Toggle status (Admin OR Owner)
exports.toggleStatus = async (req, res) => {
  try {
    const pickup = await PickupPoint.findById(req.params.id);
    if (!pickup) return res.status(404).json({ message: 'Not found' });

    // ✅ Only check ownership if user is logged in
    if (req.user && pickup.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    pickup.status = !pickup.status;
    await pickup.save();
    res.status(200).json(pickup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }  
};
