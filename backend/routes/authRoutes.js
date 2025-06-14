const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/check', authController.checkAuth);

module.exports = router;
