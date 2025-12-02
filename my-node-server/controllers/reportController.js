// my-node-server/controllers/reportController.js

const { Presensi, User } = require('../models'); // WAJIB: Import kedua model

exports.getDailyReport = async (req, res) => {
    try {
        // Asumsi middleware JWT sudah berjalan, req.user tersedia
        const { nama } = req.query; // Ambil query parameter 'nama' untuk pencarian
        
        let whereCondition = {};
        
        // Logika Pencarian: Jika parameter 'nama' ada
        if (nama) {
            // Menggunakan Sequelize.Op.like untuk pencarian yang fleksibel (case-insensitive)
            whereCondition = {
                // Mencari di kolom 'nama' pada model 'User' yang direlasikan
                '$user.nama$': { [require('sequelize').Op.like]: `%${nama}%` }
            };
        }

        // Ambil data Presensi beserta data User pemiliknya (JOIN)
        const records = await Presensi.findAll({
            where: whereCondition,
            include: [
                {
                    model: User,
                    as: 'user', // PENTING: Harus sesuai dengan alias di models/presensi.js
                    attributes: ['nama', 'email', 'role'], // Kolom yang ingin diambil dari User
                    required: true // Pastikan hanya mengambil presensi yang memiliki user
                }
            ],
            // Order untuk urutan data terbaru di atas
            order: [['createdAt', 'DESC']] 
        });

        res.json({
            message: "Data Laporan Harian",
            data: records,
        });
    } catch (error) {
        console.error("Error Report:", error);
        res.status(500).json({ message: "Gagal mengambil laporan", error: error.message });
    }
};