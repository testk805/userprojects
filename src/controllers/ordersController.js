const Order = require('../models/order');

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    return res.status(201).json(order);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Invalid Order Data' });
  }
};

module.exports = { getOrders, createOrder };
