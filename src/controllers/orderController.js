const Order = require('../models/order');

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching orders.' });
  }
};

exports.createOrder = async (req, res) => {
  const orderData = req.body;
  try {
    const newOrder = await Order.create(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'An error occurred while creating the order.' });
  }
};