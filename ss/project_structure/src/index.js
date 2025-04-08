// Import necessary modules
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Weather API endpoint
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const unit = req.query.unit || 'metric'; // default to metric (Celsius)
    const apiKey = process.env.API_KEY;

    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`);
        const weatherData = response.data;
        const temperature = weatherData.main.temp;
        res.json({ temperature, unit: unit === 'metric' ? 'Celsius' : 'Fahrenheit' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});