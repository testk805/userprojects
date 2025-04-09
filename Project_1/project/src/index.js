const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());

const db = require('./db');

app.get('/orders', async (req, res) => {
  try {
    const orders = await db.getOrders();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/orders', async (req, res) => {
  try {
    const { customerName, orderDate, totalAmount, items } = req.body;
    const newOrder = await db.createOrder({ customerName, orderDate, totalAmount, items });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Bad Request', message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
