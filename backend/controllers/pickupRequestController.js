// // controllers/pickupRequestController.js
// const PickupRequest = require('../models/pickupRequestSchema');

// // 🟢 Create
// exports.createPickupRequest = async (req, res) => {
//   try {
//     const newRequest = await PickupRequest.create(req.body);
//     res.status(201).json(newRequest);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };        

// // 📋 Get All
// exports.getAllPickupRequests = async (req, res) => {
//   try {
//     const requests = await PickupRequest.find().sort({ createdAt: -1 });
//     res.status(200).json(requests);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };         

// // 🔍 Get One
// exports.getPickupRequestById = async (req, res) => {
//   try {
//     const request = await PickupRequest.findById(req.params.id);
//     if (!request) return res.status(404).json({ message: 'Not found' });
//     res.status(200).json(request);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };                              

// // ✏️ Update
// exports.updatePickupRequest = async (req, res) => {
//   try {
//     const updated = await PickupRequest.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updated) return res.status(404).json({ message: 'Not found' });
//     res.status(200).json(updated);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };                                

// // ❌ Delete
// exports.deletePickupRequest = async (req, res) => {
//   try {
//     const deleted = await PickupRequest.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: 'Not found' });
//     res.status(200).json({ message: 'Pickup request deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };                                                                                            




// const PickupRequest = require("../models/pickupRequestSchema");

// // ✅ Create Pickup Request
// exports.createPickupRequest = async (req, res) => {
//   try {
//     const newRequest = await PickupRequest.create({
//       ...req.body,
//       user: req.user._id,
//       courierCompany: req.body.courierCompany,
//     });
//     res.status(201).json(newRequest);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // ✅ Admin - Get All Requests
// exports.getAllPickupRequests = async (req, res) => {
//   try {
//     const requests = await PickupRequest.find()
//       .sort({ createdAt: -1 })
//       .populate("user", "firstName lastName email")
//       .populate("courierCompany", "companyName");
//     res.status(200).json(requests);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Client - Get Their Requests
// exports.getMyPickupRequests = async (req, res) => {
//   try {
//     const myRequests = await PickupRequest.find({ user: req.user._id })
//       .sort({ createdAt: -1 })
//       .populate("courierCompany", "companyName");
//     res.status(200).json(myRequests);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Get Single by ID
// exports.getPickupRequestById = async (req, res) => {
//   try {
//     const request = await PickupRequest.findById(req.params.id)
//       .populate("user", "firstName email")
//       .populate("courierCompany", "companyName");
//     if (!request) return res.status(404).json({ message: "Not found" });
//     res.status(200).json(request);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Update
// exports.updatePickupRequest = async (req, res) => {
//   try {
//     const updated = await PickupRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updated) return res.status(404).json({ message: "Not found" });
//     res.status(200).json(updated);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // ✅ Delete
// exports.deletePickupRequest = async (req, res) => {
//   try {
//     const deleted = await PickupRequest.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "Not found" });
//     res.status(200).json({ message: "Pickup request deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };






// 🟢 Create
const PickupRequest = require("../models/pickupRequestSchema");

// Function to generate next requestId
const generateRequestId = async () => {
  const lastRequest = await PickupRequest.findOne().sort({ createdAt: -1 });
  let nextNumber = 1;

  if (lastRequest && lastRequest.requestId) {
    const lastNumber = parseInt(lastRequest.requestId.replace("REQ", ""), 10);
    if (!isNaN(lastNumber)) {
      nextNumber = lastNumber + 1;
    }
  }

  return "REQ" + nextNumber.toString().padStart(5, "0");
};

exports.createPickupRequest = async (req, res) => {
  try {
    let userIdToAssign;

    // ✅ If token is present (client)
    if (req.user && req.user._id) {
      userIdToAssign = req.body.user || req.user._id;

      // 🚫 Prevent client from assigning someone else's ID
      if (
        req.body.user &&
        req.body.user.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({
          message: "You are not allowed to assign pickup request to another user.",
        });
      }
    } else {
      // ✅ Admin route (no token), expect user in body
      if (!req.body.user) {
        return res.status(400).json({ message: "User ID is required." });
      }
      userIdToAssign = req.body.user;
    }

    // 🔹 Generate requestId automatically
    const requestId = await generateRequestId();

    const newRequest = await PickupRequest.create({
      ...req.body,
      user: userIdToAssign,
      requestId, // store generated ID
    });

    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// 📋 Get All (Admin)
exports.getAllPickupRequests = async (req, res) => {
  try {
    const requests = await PickupRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📋 Get Logged-in User's Requests
exports.getMyPickupRequests = async (req, res) => {
  try {
    const requests = await PickupRequest.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔍 Get One
exports.getPickupRequestById = async (req, res) => {
  try {
    const request = await PickupRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Not found' });

    if (request.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ Update
exports.updatePickupRequest = async (req, res) => {
  try {
    const request = await PickupRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Not found' });

    if (request.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updated = await PickupRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ❌ Delete
exports.deletePickupRequest = async (req, res) => {
  try {
    const request = await PickupRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Not found' });

   
    await request.deleteOne();
    res.status(200).json({ message: 'Pickup request deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
