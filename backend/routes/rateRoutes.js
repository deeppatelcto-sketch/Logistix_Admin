const express = require('express');
const { calculateRate } = require('../controllers/rateController');

const router = express.Router();

router.post('/calculate', calculateRate);

module.exports = router;
