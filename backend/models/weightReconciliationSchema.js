
// const mongoose = require('mongoose');

// const extraWeightSchema = new mongoose.Schema({
//   orderId: { type: String, required: true },
//   calculationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Calculation', required: true },
//   enteredWeightKg: { type: Number }, // order se
//   extraWeightKg: { type: Number, required: true },
//   additionalRatePerKg: { type: Number },
//   weightCharge: { type: Number },
//   fuelCharge: { type: Number },
//   gst: { type: Number },
//   totalExtraCharge: { type: Number },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
// }, { timestamps: true });

// module.exports = mongoose.model('ExtraWeight', extraWeightSchema);


const mongoose = require('mongoose');

const extraWeightSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  courierCompany: { type: String },
  zone: { type: String },
  enteredWeightKg: { type: Number },
  extraWeightKg: { type: Number },
  additionalRatePerKg: { type: Number },
  weightCharge: { type: Number },
  fuelCharge: { type: Number },
  gst: { type: Number },
  totalExtraCharge: { type: Number },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },    

}, { timestamps: true });

module.exports = mongoose.model('ExtraWeight', extraWeightSchema);