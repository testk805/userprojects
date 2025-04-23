const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
require('dotenv').config();
app.use(express.json());
app.use('/api', routes);
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error(err));