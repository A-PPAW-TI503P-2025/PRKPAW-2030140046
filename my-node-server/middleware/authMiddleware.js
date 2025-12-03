// my-node-server/middleware/authMiddleware.js (FINAL FIXED CODE - Robust)

import jwt from 'jsonwebtoken';

// 2. Tulis middleware dan gunakan export const
export const authMiddleware = (req, res, next) => {
    // Ambil token dari header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Akses ditolak. Token tidak disediakan.' });
    }

    const token = authHeader.split(' ')[1];
    
    // --- TAMBAHKAN PEMERIKSAAN KRITIS ---
    const JWT_SECRET = process.env.JWT_SECRET; 
    if (!JWT_SECRET) {
        // Jika JWT_SECRET kosong di .env, ini mengembalikan error 500
        console.error("Kesalahan Konfigurasi: JWT_SECRET tidak terdefinisi di file .env.");
        return res.status(500).json({ message: 'Kesalahan server: Kunci rahasia JWT tidak ditemukan.' });
    }
    // --- END PEMERIKSAAN KRITIS ---

    try {
        // Verifikasi token
        const decoded = jwt.verify(token, JWT_SECRET); 
        
        // Simpan payload token ke req.user
        req.user = decoded; 
        next(); // Lanjutkan ke handler berikutnya
    } catch (error) {
        // Jika verifikasi gagal (token kadaluarsa, salah, dll.)
        return res.status(401).json({ message: 'Token tidak valid atau kedaluwarsa.' });
    }
};