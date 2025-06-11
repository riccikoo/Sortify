const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const { body, validationResult } = require('express-validator');

// Create Schedule - Validasi & proteksi input
router.post('/create', [
  body('address')
    .notEmpty().withMessage('Alamat wajib diisi')
    .trim().escape(),
  body('scheduleAt')
    .notEmpty().withMessage('Waktu wajib diisi')
    .isISO8601().withMessage('Format tanggal tidak valid')
], async (req, res) => {
  // Validasi
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Lanjut ke controller
  return scheduleController.createSchedule(req, res);
});

// Get Schedules milik user
router.get('/my-schedules', scheduleController.getUserSchedules);

module.exports = router;
