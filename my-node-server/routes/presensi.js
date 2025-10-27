const express = require('express');
const router = express.Router();
const presensiController = require('../controllers/presensiController');
const { addUserData } = require('../middleware/permissionMiddleware');

router.use(addUserData);

// Endpoint baru: untuk menampilkan presensi harian
router.get('/daily', presensiController.getDailyPresensi);

// Endpoint lama: untuk check-in dan check-out
router.post('/check-in', presensiController.CheckIn);
router.post('/check-out', presensiController.CheckOut);

module.exports = router;
