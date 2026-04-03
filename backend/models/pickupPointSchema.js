// const mongoose = require('mongoose');

// const pickupPointSchema = new mongoose.Schema({
//   pickupPointName: { type: String, required: true },
//   contactName: { type: String, required: true },
//   contactNumber: { type: String, required: true },
//   address: { type: String, required: true },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   pincode: { type: String, required: true },
//   email: { type: String, required: true },
//   addressType: {
//     type: String,
//     enum: ['Office', 'Warehouse', 'Shop', 'Home','Other'],
//   },
//   latitude: { type: Number, required: true },
//   longitude: { type: Number, required: true },
//   status: { type: Boolean, default: true }
// }, { timestamps: true });

// module.exports = mongoose.model('PickupPoint', pickupPointSchema);



const mongoose = require('mongoose');

const pickupPointSchema = new mongoose.Schema({
  pickupPointName: { type: String, required: true },
  contactName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  email: { type: String, required: true },
  addressType: {
    type: String,
    enum: ['Office', 'Warehouse', 'Shop', 'Home', 'Other'],
  },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  status: { type: Boolean, default: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('PickupPoint', pickupPointSchema);
