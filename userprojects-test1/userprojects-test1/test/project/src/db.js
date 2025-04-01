const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

const getOrders = async () => {
  const result = await pool.query('SELECT * FROM orders');
  return result.rows;
};

const createOrder = async (order) => {
  const { customerName, orderDate, totalAmount, items } = order;
  const result = await pool.query('INSERT INTO orders (customer_name, order_date, total_amount) VALUES ($1, $2, $3) RETURNING *', [customerName, orderDate, totalAmount]);
  const newOrder = result.rows[0];
  for (const item of items) {
    await pool.query('INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)', [newOrder.id, item.productId, item.quantity]);
  }
  return newOrder;
};

module.exports = { getOrders, createOrder };