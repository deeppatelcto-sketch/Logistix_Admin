const mongoose = require('mongoose');

const order1Schema = new mongoose.Schema({
  pickupPincode: String,
  deliveryPincode: String,
  state: String,
  weight: Number,
  qty: Number,
  length: Number,
  width: Number,
  height: Number,
  paymentMode: String,
  invoiceValue: Number,
  status: String,

  // selected rate details
  companyName: String,
  source: { type: String, enum: ['courierRate', 'companyRate'] }, // kis source se aaya
  totalRate: Number,
  breakdown: Object
}, { timestamps: true });

module.exports = mongoose.model('Order1', order1Schema);
