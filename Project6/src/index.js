const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});