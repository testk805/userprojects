const db = require('./dbConnection');

const getOrder = async (req, res) => {
  try {
    const orders = await db.query('SELECT * FROM orders');
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createOrder = async (req, res) => {
  const { customerId, orderDate, items, totalAmount } = req.body;
  try {
    const newOrder = await db.query('INSERT INTO orders (customerId, orderDate, totalAmount) VALUES (?, ?, ?)', [customerId, orderDate, totalAmount]);
    const orderId = newOrder.insertId;
    // Assuming items are saved in a separate table
    for (const item of items) {
      await db.query('INSERT INTO order_items (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)', [orderId, item.productId, item.quantity, item.price]);
    }
    res.status(201).json({ id: orderId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getOrder, createOrder };