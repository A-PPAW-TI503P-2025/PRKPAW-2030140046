// my-node-server/routes/reports.js (FINAL FIXED CODE: Stabilitas)

import express from "express";
const router = express.Router();

// 1. Impor Controller dan Middleware sebagai Wrapper
import * as reportControllerWrapper from "../controllers/reportController.js";
import * as authMiddlewareWrapper from "../middleware/authMiddleware.js"; 


// 2. Terapkan Endpoint Report
// Endpoint-nya adalah '/' karena di server.js sudah app.use('/api/reports', ...)
router.get(
    "/", 
    authMiddlewareWrapper.authMiddleware, 
    reportControllerWrapper.getReport     
);


export default router;