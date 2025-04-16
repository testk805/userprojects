const db = require('../config/db');

exports.getAll = async () => {
  // Database query to get all orders
  const orders = await db.query('SELECT * FROM orders');
  return orders;
};

exports.create = async (orderData) => {
  // Database query to create a new order
  const result = await db.query('INSERT INTO orders SET ?', orderData);
  return result;
};