

// const mongoose = require("mongoose");

// const MLorderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   calculationId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Calculation",
//     required: true
//   },
//   orderId: {               // ⬅️ New field for custom order ID
//     type: String,
//     unique: true
//   },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("MLOrder", MLorderSchema);



const mongoose = require("mongoose");

const MLorderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  calculationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Calculation",
    required: true
  },
  calculationDetails: {            
    type: Object,
    required: true
  },
  orderId: {                     
    type: String,
    unique: true
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MLOrder", MLorderSchema);                     



