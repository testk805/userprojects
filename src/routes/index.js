const express = require('express');
const teamController = require('../controllers/teamController');
const router = express.Router();

router.get('/teams', teamController.getTeams);

module.exports = router;