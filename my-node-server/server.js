// my-node-server/server.js

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;
const morgan = require("morgan"); // Untuk logging

// --- Import Middleware Auth ---
// Pastikan permissionMiddleware.js sudah diisi kode JWT yang baru
const { authenticateToken, isAdmin } = require("./middleware/permissionMiddleware");

// --- Import Routers ---
const presensiRoutes = require("./routes/presensi.js"); 
const reportRoutes = require("./routes/report.js");
const ruteBuku = require("./routes/books.js");
const authRoutes = require("./routes/auth.js"); // Router untuk Login/Register

// --- Middleware Global ---
app.use(cors()); 
app.use(express.json()); // Wajib untuk parsing req.body
app.use(morgan("dev")); 

app.get("/", (req, res) => {
    res.send("Home Page for API");
});

// --- Route Handlers ---
app.use("/api/auth", authRoutes); // Rute Auth (Login/Register) TIDAK dilindungi

// Terapkan JWT Middleware pada rute yang perlu dilindungi:
// Semua rute ini memerlukan header Authorization: Bearer <token>
app.use("/api/books", ruteBuku); 
app.use("/api/presensi", authenticateToken, presensiRoutes); 
app.use("/api/reports", authenticateToken, reportRoutes); 

// Jalankan server
app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}/`);
});