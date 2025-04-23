const axios = require('axios');

exports.getWeatherReport = async (req, res) => {
  const location = req.query.location || 'your_location';
  try {
    const response = await axios.get(`http://${process.env.HTTP_HOST}:${process.env.HTTP_PORT}/weather?location=${location}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Error fetching weather data', details: error.message });
  }
};