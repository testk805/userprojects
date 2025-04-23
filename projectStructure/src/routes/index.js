const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/food-recipe', recipeController.getFoodRecipe);

module.exports = router;