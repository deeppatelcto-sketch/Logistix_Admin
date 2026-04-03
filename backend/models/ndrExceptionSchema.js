// models/ndrException.js
const mongoose = require('mongoose');

const ndrExceptionSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
    unique: true,
  },
  date: {
    type: String,
    required: true,
  },
  lastUpdate: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  attempts: {
    type: Number,
    default: 1,
  },
  mode: {
    type: String,
    enum: ['prepaid', 'cod', 'to pay', 'franchisee to pay'],
    required: true,
  },
  actionTaken: {
    type: String,
    enum: ['Return', 'Reattempt', 'Comment', ''],
    default: '',
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
}, {
  timestamps: true,
});

module.exports = mongoose.model('NdrException', ndrExceptionSchema);
