const axios = require('axios');
const { logError } = require('../middleware/errorLogger');

exports.getWeather = async (req, res) => {
  const { city, temperatureUnit } = req.query;
  try {
    const response = await axios.get(`API_URL_HERE?city=${city}&unit=${temperatureUnit}`);
    return res.json(response.data);
  } catch (error) {
    logError(error);
    return res.status(500).json({ error: 'An error occurred while fetching weather data.' });
  }
};