// my-node-server/routes/presensi.js

const express = require('express');
const router = express.Router();
// Pastikan path ke controller sudah benar
const presensiController = require('../controllers/presensiController.js'); 

// Middleware authenticateToken sudah diterapkan di server.js (router.use(authenticateToken)
// Sekarang router.post dapat langsung memanggil controller

router.post('/check-in', presensiController.CheckIn);
router.post('/check-out', presensiController.CheckOut);
router.delete('/:id', presensiController.deletePresensi);

// Anda mungkin ingin menambahkan rute untuk laporan user
// router.get('/user-report', presensiController.getUserReport); 

module.exports = router;