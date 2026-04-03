
// const mongoose = require('mongoose');
// const orderSchema = new mongoose.Schema({
//   pickupPincode: String,
//   deliveryPincode: String,
//   weight: Number,
//   qty: Number,
//   length: Number,
//   width: Number,
//   height: Number,

//   paymentMode: {
//     type: String,
//     enum: ['prepaid', 'cod', 'to pay', 'franchisee to pay'],
//     required: true,
//   },

//   invoiceValue: Number,
//   insurance: { type: Boolean, default: false },
//   appointmentDelivery: { type: Boolean, default: false },

//   zone: String,
//   finalRate: Number,
//   selectedCourierCompany: String,

//   status: {
//     type: String,
//     enum: ['Drafted','pending', 'readytoship', 'shipped', 'delivered', 'cancelled'],
//     default: 'pending',
//   },

//   // ✅ New field for LR/AWB No
//   orderId: {
//     type: String,
//     unique: true,
//     required: true,
//   },
// }, {
//   timestamps: true
// });
// module.exports = mongoose.model('Order', orderSchema);    






// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   pickupPincode: String,
//   deliveryPincode: String,
//   weight: Number,
//   qty: Number,
//   length: Number,
//   width: Number,
//   height: Number,

//   paymentMode: {
//     type: String,
//     enum: ['prepaid', 'cod', 'to pay', 'franchisee to pay'],
//     required: true,
//   },

//   invoiceValue: Number,
//   insurance: { type: Boolean, default: false },
//   appointmentDelivery: { type: Boolean, default: false },

//   zone: String,
//   finalRate: Number,
//   selectedCourierCompany: String,

//   status: {
//     type: String,
//     enum: ['Drafted','pending', 'readytoship', 'shipped', 'delivered', 'cancelled'],
//     default: 'pending',
//   },

//   // ✅ New field for LR/AWB No
//   orderId: {
//     type: String,
//     unique: true,
//     required: true,
//   },

  

// }, {
//   timestamps: true
// });


// module.exports = mongoose.model('Order', orderSchema);    



// models/orderSchema.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  pickupPincode: String,
  deliveryPincode: String,
  weight: Number,
  qty: Number,
  length: Number,
  width: Number,
  height: Number,

  paymentMode: {
    type: String,
    enum: ['prepaid', 'cod', 'to pay', 'franchisee to pay'],
    required: true,
  },

  invoiceValue: Number,
  insurance: { type: Boolean, default: false },
  appointmentDelivery: { type: Boolean, default: false },

  zone: String,
  finalRate: Number,
  selectedCourierCompany: String,

  status: {
    type: String,
    enum: ['Drafted','pending', 'readytoship', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },

  // ✅ New field for LR/AWB No
  orderId: {
    type: String,
    unique: true,
    required: true,
  },

  // ✅ Link order with User
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
