const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const presensiController = require("../controllers/presensiController");

// ✅ Middleware Validasi Tanggal
const validateTanggal = [
  body("checkIn")
    .optional()
    .isISO8601()
    .withMessage("Format checkIn tidak valid. Gunakan format ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)."),
  body("checkOut")
    .optional()
    .isISO8601()
    .withMessage("Format checkOut tidak valid. Gunakan format ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validasi Gagal",
        errors: errors.array(),
      });
    }
    next();
  },
];

// ✅ Gunakan middleware sebelum controller
router.put("/:id", validateTanggal, presensiController.updatePresensi);

module.exports = router;
