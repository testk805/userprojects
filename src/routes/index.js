const express = require('express');
const router = express.Router();
const accountsRoutes = require('./accounts');
router.use('/accounts', accountsRoutes);
module.exports = router;