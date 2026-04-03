const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: String,
  filePath: String,
  fileType: String,
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);
