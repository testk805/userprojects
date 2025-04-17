const express = require('express');
const { getOrders, createOrder } = require('../controllers/ordersController');

const router = express.Router();

router.get('/orders', getOrders);
router.post('/orders', createOrder);

module.exports = router;
