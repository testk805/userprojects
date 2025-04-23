const Location = require('../models/location');

exports.createLocation = async (req, res) => {
  try {
    const locationData = req.body;
    const newLocation = new Location(locationData);
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the location.' });
  }
};