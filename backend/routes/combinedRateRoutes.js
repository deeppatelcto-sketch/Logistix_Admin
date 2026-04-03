const express = require('express');
const { calculateAllRates } = require('../controllers/combinedRateController');
const router = express.Router();

router.post('/calculate', calculateAllRates);

module.exports = router;
