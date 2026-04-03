
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String},
  lastName: { type: String},
  gender: { type: String, enum: ["male", "female"] },
  birthDate: { type: Date },
  email: {
    type: String,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
      sparse: true 
  },
  phoneNumber: {
    type: String,
    unique: true,
    match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
  },
  otp: { type: String },       
});

module.exports = mongoose.model("User", userSchema);     

