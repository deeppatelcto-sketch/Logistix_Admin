const mongoose = require('mongoose');

const overheadSchema = new mongoose.Schema({
  minWeight: Number,
  docketCharge: Number,
  fuel: Number,
  rovCharge: String,
  insurance: String,
  codCharge: String,
  handlingCharge: String,
  fmCharge: String,
  appointmentCharge: String,
  greenTax: String,
  stateCharge: String,
  divisor: Number,
  minCharge: String,
});

const odaMatrixSchema = new mongoose.Schema({
  distanceRange: String, 
  weightRange: String, 
  charge: Number,
});

const zoneRateSchema = new mongoose.Schema({
  fromZone: String,
  toZone: String,
  rate: Number,
});

const b2bCourierRateSchema = new mongoose.Schema({
  courierName: { type: String, required: true }, // Delhivery, DTDC etc.
  overheads: overheadSchema,
  odaMatrix: [odaMatrixSchema],
  zoneRates: [zoneRateSchema],
}, { timestamps: true });

module.exports = mongoose.model('B2BCourierRate', b2bCourierRateSchema);
