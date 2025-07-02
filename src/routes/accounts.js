const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');
router.post('/', accountsController.createAccount);
router.get('/:id', accountsController.getAccountDetails);
module.exports = router;