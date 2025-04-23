const express = require('express');
const weatherRoutes = require('./weather');
const router = express.Router();

router.use(weatherRoutes);

module.exports = router;