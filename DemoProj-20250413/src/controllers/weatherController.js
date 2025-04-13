const axios = require('axios');

const getWeather = async (req, res) => {
  const { lat, lon } = req.params;
  const apiKey = process.env.API_KEY;

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const weatherData = response.data;
    const result = {
      temperature: weatherData.main.temp,
      rain: weatherData.rain ? weatherData.rain['1h'] : 0
    };
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching weather data.' });
  }
};

module.exports = { getWeather };