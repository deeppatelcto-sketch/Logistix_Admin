// // models/supportTicketSchema.js
// const mongoose = require("mongoose");

// const replySchema = new mongoose.Schema({
//   message: String,
//   repliedBy: String, // 'admin' / 'customer' / 'courier'
//   repliedAt: { type: Date, default: Date.now },
//   attachment: String,
// });

// const supportTicketSchema = new mongoose.Schema({
//   ticketId: { type: Number, required: true, unique: true },

//   userType: { type: String, enum: ["customer", "courier"], required: true },
//   customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, 
//   courierCompanyId: { type: mongoose.Schema.Types.ObjectId, ref: "CourierCompany", default: null },

//   category: String,
//   subCategory: String,
//   subject: String,
//   description: String,
//   file: String,
//   status: { type: String, enum: ["Open", "Pending", "Closed"], default: "Open" },

//   replies: [replySchema],
// }, { timestamps: true });

// module.exports = mongoose.model("SupportTicket", supportTicketSchema);





const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  message: String,
  repliedBy: String, // 'admin' / 'user'
  repliedAt: { type: Date, default: Date.now },
  attachment: String,
});

const supportTicketSchema = new mongoose.Schema(
  {
    ticketId: { type: Number, required: true, unique: true },

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // from token

    category: String,
    subCategory: String,
    subject: String,
    description: String,
    file: String,
    status: { type: String, enum: ["Open", "Pending", "Closed"], default: "Open" },

    replies: [replySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("SupportTicket", supportTicketSchema);
