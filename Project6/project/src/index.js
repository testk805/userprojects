const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { getOrders, createOrder } = require('./ordersController');

app.use(bodyParser.json());

app.get('/orders', getOrders);
app.post('/orders', createOrder);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});