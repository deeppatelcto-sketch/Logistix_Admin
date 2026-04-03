const mongoose = require("mongoose");

const calculationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  fileName: String,
  state: String,
  pincode: String,
  zone: String,
  isODA: Boolean,
  odaType: String,
  weight: Number,
  ratePerKg: Number,
  freight: Number,
  DWB: Number,
  FOV: Number,
  NGT: Number,
  ODA: Number,
  totalWithoutFSC: Number,
  FSC: Number,
  subtotal: Number,
  GST: Number,
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Calculation", calculationSchema);
