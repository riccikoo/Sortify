const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');

// Ambil semua user
router.get('/', userController.getAllUsers);

// Register user baru dengan validasi
router.post('/users', [
  body('name').notEmpty().withMessage('Nama wajib diisi').trim().escape(),
  body('email').isEmail().withMessage('Email tidak valid').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password tidak cocok");
    }
    return true;
  }),
  body('phone').notEmpty().withMessage('Nomor HP wajib diisi').trim().escape()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return userController.createUser(req, res);
});

// Login user
router.post('/signin', [
  body('email').isEmail().withMessage('Email tidak valid').normalizeEmail(),
  body('password').notEmpty().withMessage('Password wajib diisi')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, userController.loginUser);

module.exports = router;
