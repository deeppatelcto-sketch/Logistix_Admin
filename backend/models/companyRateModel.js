const mongoose = require('mongoose');

const companyRateSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  logoPath: { type: String, required: true },
  csvFileName: { type: String, required: true },
  csvFilePath: { type: String, required: true },
  csvFileType: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('CompanyRate', companyRateSchema);
