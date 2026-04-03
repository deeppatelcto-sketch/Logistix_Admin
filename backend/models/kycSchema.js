const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
    consignerMobileNo: {
        type: String,
        required: true
    },
    organizationType: {
        type: String,
        enum: ['Individual', 'Company', 'Partnership firm', 'Trusts, Foundations'],
        required: true
    },
    documentOne: {
        type: {
            documentType: { type: String, required: true },
            filePath: { type: String, required: true }
        },
        required: true
    },
    documentTwo: {
        type: {
            documentType: { type: String, required: true },
            filePath: { type: String, required: true }
        },
        required: true
    },
     status: {                          
    type: String,
    enum: ['Pending', 'Applied', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('KYC', kycSchema);
