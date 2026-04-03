const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig');
const companyRateController = require('../controllers/companyRateController');

// List companies
router.get('/allb2brate', companyRateController.listCompanies);

// Upload company with logo + CSV
router.post(
  '/uploadb2b',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'csvFile', maxCount: 1 }
  ]),
  companyRateController.uploadCompanyRates
);

// View company rates
router.get('/view/:id', companyRateController.viewRates);

module.exports = router;
