// my-node-server/server.js (FINAL)

import 'dotenv/config.js';
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Import Router sebagai Wrapper (Pola stabil untuk CommonJS exports)
import * as authRoutesWrapper from "./routes/auth.js"; 
import * as presensiRoutesWrapper from "./routes/presensi.js"; 
import * as reportRoutesWrapper from "./routes/reports.js"; 

const app = express(); // HARUS DIDEFINISIKAN SEBELUM DIGUNAKAN
const PORT = process.env.PORT || 3001; 

// Global middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// Root
app.get("/", (req, res) => {
  res.send("Selamat Datang di API Absensi Kampus!");
});

// ROUTES
// Akses router melalui properti .default
app.use("/api/auth", authRoutesWrapper.default); 
app.use("/api/presensi", presensiRoutesWrapper.default);
app.use("/api/reports", reportRoutesWrapper.default); 

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

// ERROR Handler
app.use((err, req, res, next) => {
  console.error("ERROR:", err.stack);
  res.status(500).json({ message: "Terjadi kesalahan pada server" });
});

app.listen(PORT, () =>
  console.log(`Server berjalan di http://localhost:${PORT}`)
);