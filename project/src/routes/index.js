const express = require('express');
const router = express.Router();
const { getRandomNumberAndFibonacci } = require('../controllers/randomController');
router.get('/random', getRandomNumberAndFibonacci);
module.exports = router;