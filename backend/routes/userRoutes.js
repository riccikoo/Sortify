const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/users', userController.createUser);
router.post('/signin', (req, res, next) => {
  console.log("POST /api/signin route hit");
  next();
}, userController.loginUser);

module.exports = router;
