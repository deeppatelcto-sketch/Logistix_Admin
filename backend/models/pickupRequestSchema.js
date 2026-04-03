

// // models/pickupRequestModel.js
// const mongoose = require('mongoose');

// const pickupRequestSchema = new mongoose.Schema({
//   shippingPartner: {
//     type: String,
//     required: true,
//   },
//   warehouse: {
//     type: String,
//     required: true,
//   },
//   expectedPackageCount: {
//     type: Number,
//     required: true,
//   },
//   pickupDate: {
//     type: Date,
//     required: true,
//   },   
//   pickupTime: {
//     type: String,
//     required: true,
//   },
// }, { timestamps: true });

// module.exports = mongoose.model('PickupRequest', pickupRequestSchema);  






// const mongoose = require("mongoose");

// const pickupRequestSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   courierCompany: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "CourierCompany",
//   },
//   shippingPartner: {
//     type: String,
//     required: true,
//   },
//   warehouse: {
//     type: String,
//     required: true,
//   },
//   expectedPackageCount: {
//     type: Number,
//     required: true,
//   },
//   pickupDate: {
//     type: Date,
//     required: true,
//   },
//   pickupTime: {
//     type: String,
//     required: true,
//   },
// }, { timestamps: true });

// module.exports = mongoose.model("PickupRequest", pickupRequestSchema);



// const mongoose = require('mongoose');

// const pickupRequestSchema = new mongoose.Schema({
//   shippingPartner: {
//     type: String,
//     required: true,
//   },
//   warehouse: {
//     type: String,
//     required: true,
//   },
//   expectedPackageCount: {
//     type: Number,
//     required: true,
//   },
//   pickupDate: {
//     type: Date,
//     required: true,
//   },
//   pickupTime: {
//     type: String,
//     required: true,
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
// }, { timestamps: true });

// module.exports = mongoose.model('PickupRequest', pickupRequestSchema);




const mongoose = require('mongoose');

const pickupRequestSchema = new mongoose.Schema({
  requestId: {
    type: String,
    required: true,
    unique: true
  },
  shippingPartner: {
    type: String,
    required: true,
  },
  warehouse: {
    type: String,
    required: true,
  },
  expectedPackageCount: {
    type: Number,
    required: true,
  },
  pickupDate: {
    type: Date,
    required: true,
  },
  pickupTime: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('PickupRequest', pickupRequestSchema);
