// const Order = require('../models/orderSchema');
// const CourierRate = require('../models/courierrateSchema');
// const ExtraWeight = require('../models/weightReconciliationSchema');
// const { getZone } = require('../utils/getZoneByPincode');

// // POST /weight
// exports.reconcileWeight = async (req, res) => {
//   try {
//     const { orderId, extraWeightKg } = req.body;

//     if (!orderId || extraWeightKg == null) {
//       return res.status(400).json({ message: "orderId and extraWeightKg are required" });
//     }

//     const existing = await ExtraWeight.findOne({ orderId });
//     if (existing) {
//       return res.status(400).json({ message: "Reconciliation already exists for this orderId" });
//     }

//     const order = await Order.findOne({ orderId });
//     if (!order) return res.status(404).json({ message: 'Order not found' });

//     if (!['pending', 'readytoship'].includes(order.status)) {
//       return res.status(400).json({ message: "Only pending or readytoship orders can be reconciled" });
//     }

//     const courier = await CourierRate.findOne({ companyName: order.selectedCourierCompany });
//     if (!courier) return res.status(404).json({ message: 'Courier rate not found' });

//     const zone = await getZone(order.pickupPincode, order.deliveryPincode);
//     if (!zone) return res.status(400).json({ message: 'Zone could not be determined' });

//     const additionalRate = parseFloat(courier[`${zone}_additional`] || 0);
//     const GST_PERCENT = 18;

//     if (extraWeightKg <= 0) {
//       return res.status(400).json({ message: "Extra weight must be greater than 0" });
//     }

//     const weightCharge = extraWeightKg * additionalRate;
//     const fuelPercent = parseFloat(courier.fuelSurcharge?.replace('%', '') || 0);
//     const fuelCharge = (weightCharge * fuelPercent) / 100;
//     const freightBeforeGST = weightCharge + fuelCharge;
//     const gst = (freightBeforeGST * GST_PERCENT) / 100;
//     const totalCharge = freightBeforeGST + gst;

//     await ExtraWeight.create({
//       orderId: order.orderId,
//       courierCompany: courier.companyName,
//       zone,
//       enteredWeightKg: order.weight,
//       extraWeightKg,
//       additionalRatePerKg: additionalRate,
//       weightCharge,
//       fuelCharge,
//       gst,
//       totalExtraCharge: totalCharge
//     });

//     res.status(200).json({
//       message: "Extra charge calculated successfully",
//       courierCompany: courier.companyName,
//       zone,
//       enteredWeightKg: order.weight,
//       extraWeightKg,
//       additionalRatePerKg: additionalRate,
//       weightCharge: weightCharge.toFixed(2),
//       fuelCharge: fuelCharge.toFixed(2),
//       gst: gst.toFixed(2),
//       totalExtraCharge: totalCharge.toFixed(2)
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // GET /reconciliation/list
// exports.getAllExtraWeights = async (req, res) => {
//   try {
//     const weights = await ExtraWeight.find().sort({ createdAt: -1 });
//     res.status(200).json(weights);
//   } catch (error) {
//     console.error("Error fetching extra weights", error);
//     res.status(500).json({ message: "Failed to fetch extra weights" });
//   }
// };

// // DELETE /reconciliation/:orderId
// exports.deleteExtraWeightByOrderId = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const deleted = await ExtraWeight.findOneAndDelete({ orderId });

//     if (!deleted) {
//       return res.status(404).json({ message: "Reconciliation entry not found" });
//     }

//     res.status(200).json({ message: "Reconciliation deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting reconciliation", error);
//     res.status(500).json({ message: "Failed to delete reconciliation" });
//   }
// };
    


const Order = require('../models/orderSchema');
const CourierRate = require('../models/courierrateSchema');
const ExtraWeight = require('../models/weightReconciliationSchema');
const { getZone } = require('../utils/getZoneByPincode');

// 🟢 CREATE Weight Reconciliation
exports.reconcileWeight = async (req, res) => {
  try {
    const { orderId, extraWeightKg } = req.body;

    if (!orderId || extraWeightKg == null) {
      return res.status(400).json({ message: "orderId and extraWeightKg are required" });
    }

    const existing = await ExtraWeight.findOne({ orderId });
    if (existing) {
      return res.status(400).json({ message: "Reconciliation already exists for this orderId" });
    }

    const order = await Order.findOne({ orderId }).populate("user");
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (!['pending', 'readytoship'].includes(order.status)) {
      return res.status(400).json({ message: "Only pending or readytoship orders can be reconciled" });
    }

    const courier = await CourierRate.findOne({ companyName: order.selectedCourierCompany });
    if (!courier) return res.status(404).json({ message: 'Courier rate not found' });

    const zone = await getZone(order.pickupPincode, order.deliveryPincode);
    if (!zone) return res.status(400).json({ message: 'Zone could not be determined' });

    const additionalRate = parseFloat(courier[`${zone}_additional`] || 0);
    const GST_PERCENT = 18;

    if (extraWeightKg <= 0) {
      return res.status(400).json({ message: "Extra weight must be greater than 0" });
    }

    const weightCharge = extraWeightKg * additionalRate;
    const fuelPercent = parseFloat(courier.fuelSurcharge?.replace('%', '') || 0);
    const fuelCharge = (weightCharge * fuelPercent) / 100;
    const freightBeforeGST = weightCharge + fuelCharge;
    const gst = (freightBeforeGST * GST_PERCENT) / 100;
    const totalCharge = freightBeforeGST + gst;

    await ExtraWeight.create({
      orderId: order.orderId,
      courierCompany: courier.companyName,
      zone,
      enteredWeightKg: order.weight,
      extraWeightKg,
      additionalRatePerKg: additionalRate,
      weightCharge,
      fuelCharge,
      gst,
      totalExtraCharge: totalCharge,
      user: order.user._id,   // ✅ Save user
    });

    res.status(200).json({
      message: "Extra charge calculated successfully",
      courierCompany: courier.companyName,
      zone,
      enteredWeightKg: order.weight,
      extraWeightKg,
      additionalRatePerKg: additionalRate,
      weightCharge: weightCharge.toFixed(2),
      fuelCharge: fuelCharge.toFixed(2),
      gst: gst.toFixed(2),
      totalExtraCharge: totalCharge.toFixed(2)
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 🟢 GET All (Admin)
exports.getAllExtraWeights = async (req, res) => {
  try {
    const weights = await ExtraWeight.find().populate("user").sort({ createdAt: -1 });
    res.status(200).json(weights);
  } catch (error) {
    console.error("Error fetching extra weights", error);
    res.status(500).json({ message: "Failed to fetch extra weights" });
  }
};

// 🟢 GET for Client (Token-based User only)
exports.getUserExtraWeights = async (req, res) => {
  try {
    const weights = await ExtraWeight.find({ user: req.user._id })
      .populate("user")
      .sort({ createdAt: -1 });

    res.status(200).json(weights);
  } catch (error) {
    console.error("Error fetching user extra weights", error);
    res.status(500).json({ message: "Failed to fetch user extra weights" });
  }
};

// 🟢 DELETE by orderId
exports.deleteExtraWeightByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const deleted = await ExtraWeight.findOneAndDelete({ orderId });

    if (!deleted) {
      return res.status(404).json({ message: "Reconciliation entry not found" });
    }

    res.status(200).json({ message: "Reconciliation deleted successfully" });
  } catch (error) {
    console.error("Error deleting reconciliation", error);
    res.status(500).json({ message: "Failed to delete reconciliation" });
  }
};
