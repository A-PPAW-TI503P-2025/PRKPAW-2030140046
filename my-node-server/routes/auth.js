// my-node-server/routes/auth.js (FINAL FIXED CODE)

import express from "express"; // Ganti const express = require("express");
const router = express.Router();

// Ganti const authController = require("../controllers/authController");
// Kita asumsikan authController diekspor sebagai objek penuh
import * as authController from "../controllers/authController.js"; 

// router.post("/register", authController.register);
// router.post("/login", authController.login);
// (Baris ini sudah benar)

router.post("/register", authController.register);
router.post("/login", authController.login);

// Ganti module.exports = router;
export default router;