const Order = require('../models/order');

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders.' });
  }
};

exports.createOrder = async (req, res) => {
  const { customerId, orderDate, items, totalAmount } = req.body;
  try {
    const newOrder = new Order({ customerId, orderDate, items, totalAmount });
    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully.', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order.' });
  }
};