const mongoose = require('mongoose');
const WeatherSchema = new mongoose.Schema({
  location: { type: String, required: true },
  temperature: { type: Number, required: true },
  description: { type: String, required: true }
});
module.exports = mongoose.model('Weather', WeatherSchema);