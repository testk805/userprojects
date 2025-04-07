const express = require('express');
const router = express.Router();
const Order = require('./models/Order');

// Get Orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
});

// Create Order
router.post('/', async (req, res) => {
  const { customerId, orderDate, items, totalAmount } = req.body;
  const newOrder = new Order({ customerId, orderDate, items, totalAmount });
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

module.exports = router;