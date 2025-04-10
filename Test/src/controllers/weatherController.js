const axios = require('axios');

exports.getWeather = async (req, res) => {
  try {
    const location = req.query.location;
    const response = await axios.get(`http://${process.env.HOST}:${process.env.PORT}/weather`, {
      params: { location }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};