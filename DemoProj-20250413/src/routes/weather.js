const express = require('express');
const { getWeather } = require('../controllers/weatherController');

const router = express.Router();

router.get('/:lat/:lon', getWeather);

module.exports = router;