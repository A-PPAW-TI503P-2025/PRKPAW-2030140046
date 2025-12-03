// my-node-server/routes/presensi.js (FINAL)

import express from "express";
const router = express.Router();

import * as presensiControllerWrapper from "../controllers/presensiController.js";
import * as authMiddlewareWrapper from "../middleware/authMiddleware.js"; 


router.post(
    "/check-in", 
    authMiddlewareWrapper.authMiddleware, 
    presensiControllerWrapper.CheckIn    
);

router.post(
    "/check-out", 
    authMiddlewareWrapper.authMiddleware,
    presensiControllerWrapper.CheckOut    
);

export default router;