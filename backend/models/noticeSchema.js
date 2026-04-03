// const mongoose = require("mongoose")

// const noticeSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     details: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         required: true
//     },
//     school: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'admin'
//     },
// }, { timestamps: true });

// module.exports = mongoose.model("notice", noticeSchema)












// const mongoose = require("mongoose");

// const noticeSchema = new mongoose.Schema({
   
//     firstName: {
//         type: String,
//         required: true
//     },
//     lastName: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true, // To ensure the email is unique
//         // match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ // Email format validation
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     address: {
//         type: String,
//         required: true
//     },
//     phoneNumber: {
//         type: String,
//         required: true,
//         // match: /^[0-9]{10}$/ // Phone number format validation (adjust as needed for different formats)
//     },
// }, );

// module.exports = mongoose.model("notice", noticeSchema);


const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    otp: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model("notice", noticeSchema);