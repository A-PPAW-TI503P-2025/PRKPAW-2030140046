// middleware/presensiValidation.js

const { body, validationResult } = require('express-validator');

// 1. Validasi untuk field checkIn dan checkOut
exports.validateUpdatePresensi = [
    // checkIn: Pastikan jika ada, formatnya adalah format tanggal ISO 8601
    body('checkIn')
        .optional({ nullable: true, checkFalsy: true }) // Boleh kosong, null, atau undefined
        .isISO8601()
        .withMessage('Format checkIn harus dalam format tanggal ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ).'),

    // checkOut: Pastikan jika ada, formatnya adalah format tanggal ISO 8601
    body('checkOut')
        .optional({ nullable: true, checkFalsy: true }) // Boleh kosong, null, atau undefined
        .isISO8601()
        .withMessage('Format checkOut harus dalam format tanggal ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ).'),
];

// 2. Middleware untuk menangani hasil validasi
exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        // Ambil pesan error pertama
        const firstError = errors.array()[0].msg;
        return res.status(400).json({ 
            message: "Validasi Gagal",
            error: firstError 
        });
    }
    next();
};