const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Upload directories
const logoDir = path.join(__dirname, '../uploads/companylogos');
const csvDir = path.join(__dirname, '../uploads/csv');

// Ensure directories exist
if (!fs.existsSync(logoDir)) fs.mkdirSync(logoDir, { recursive: true });
if (!fs.existsSync(csvDir)) fs.mkdirSync(csvDir, { recursive: true });

// Storage config (choose based on fieldname)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'logo') {
      cb(null, logoDir);
    } else if (file.fieldname === 'csvFile') {
      cb(null, csvDir);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Middleware
const upload = multer({ storage });

module.exports = upload;
