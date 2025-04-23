const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));