const express = require('express');
const { getWeatherReport } = require('../controllers/weatherController');
const router = express.Router();

router.get('/weather', getWeatherReport);

module.exports = router;