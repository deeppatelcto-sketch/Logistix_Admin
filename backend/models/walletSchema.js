

// const mongoose = require('mongoose');

// const transactionSchema = new mongoose.Schema({
//   type: { type: String, enum: ['credit', 'debit', 'refund'], required: true },
//   amount: { type: Number, required: true },
//   date: { type: Date, default: Date.now },
//   description: { type: String },
// });

// const walletSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     refPath: 'userModel',
//   },
//   userModel: {
//     type: String,
//     required: true,
//     enum: ['Customer', 'CourierCompany'],
//   },
//   balance: { type: Number, default: 0 },
//   transactions: [transactionSchema],
// }, { timestamps: true });

// // ✅ Ensure uniqueness of (userId + userModel) combination
// walletSchema.index({ userId: 1, userModel: 1 }, { unique: true });

// const Wallet = mongoose.model('Wallet', walletSchema);
// module.exports = Wallet;






const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['credit', 'debit', 'refund'], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String },
});

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'userModel',
  },
  userModel: {
    type: String,
    required: true,
    enum: ['Customer', 'CourierCompany'],
  },
  balance: { type: Number, default: 0 },
  transactions: [transactionSchema],
}, { timestamps: true });

walletSchema.index({ userId: 1, userModel: 1 }, { unique: true });

module.exports = mongoose.model('Wallet', walletSchema);
