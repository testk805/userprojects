const db = require('./db');

exports.getOrders = async (req, res) => {
  try {
    const orders = await db.query('SELECT * FROM orders');
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { customerId, orderDate, items, totalAmount } = req.body;
    const newOrder = await db.query('INSERT INTO orders ...', [customerId, orderDate, items, totalAmount]);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Bad Request', details: error.message });
  }
};