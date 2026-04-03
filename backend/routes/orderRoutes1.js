const express = require('express');
const { createOrder, listOrders } = require('../controllers/orderController1');
const router = express.Router();

router.post('/create', createOrder);
router.get('/list', listOrders);

module.exports = router;
