// routes/report.js (Koreksi)

const express = require('express');
const router = express.Router();

// Hapus import addUserData yang menyebabkan error
// const { addUserData, isAdmin } = require('../middleware/permissionMiddleware'); 
// Ganti dengan:
const { isAdmin } = require('../middleware/permissionMiddleware.js'); 

const reportController = require('../controllers/reportController.js'); 

// Terapkan middleware JWT Auth di SERVER.JS (sudah dilakukan)
// Router ini hanya perlu middleware otoritas (isAdmin) dan controller
// CATATAN: Middleware authenticateToken sudah berjalan di SERVER.JS untuk rute /api/reports
router.get('/daily', isAdmin, reportController.getDailyReport); 

module.exports = router;