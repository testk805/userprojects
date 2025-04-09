const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const unit = req.query.unit || 'metric';

    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${process.env.API_KEY}`);
        return res.json({
            temperature: response.data.main.temp,
            unit: unit === 'imperial' ? 'Fahrenheit' : 'Celsius',
            city: response.data.name
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});