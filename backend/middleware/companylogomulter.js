
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define upload paths
const uploadPath = path.join(__dirname, '../uploads/companylogos');
const uploadPathCSV = path.join(__dirname, '../uploads/csv');

// Ensure folders exist
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

if (!fs.existsSync(uploadPathCSV)) {
  fs.mkdirSync(uploadPathCSV, { recursive: true });
}

// Company logo storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// CSV storage config
const csvStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPathCSV);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Properly apply storage configuration
const companylogoupload = multer({ storage: storage });
const csvUpload = multer({ storage: csvStorage }); // ✅ FIXED: use `storage`

module.exports = { companylogoupload, csvUpload };


