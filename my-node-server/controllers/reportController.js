// my-node-server/controllers/reportController.js (FINAL FIXED CODE)

// Import Wrapper untuk model Sequelize
import * as modelsWrapper from "../models/index.js"; 

// Destructuring Model dan Library dari objek db
const db = modelsWrapper.default;
const { Presensi, User, Sequelize } = db; 

// Implementasi getReport
export const getReport = async (req, res) => {
    try {
        // Ambil semua data presensi, termasuk data user yang bersangkutan
        const reports = await Presensi.findAll({
            // Pastikan relasi sudah didefinisikan di models/user.js dan models/presensi.js
            include: [{
                model: User,
                as: 'user', 
                attributes: ['id', 'nama', 'email'] 
            }],
            order: [['checkIn', 'DESC']]
        });

        return res.json({
            message: "Data laporan presensi berhasil diambil",
            data: reports
        });

    } catch (error) {
        console.error("Error getReport:", error);
        return res.status(500).json({ 
            message: "Gagal mengambil data laporan",
            error: error.message 
        });
    }
};


const reports = await Presensi.findAll({
            include: [{
                model: User,
                as: 'user', // <--- HARUS SAMA DENGAN models/presensi.js
                attributes: ['id', 'nama', 'email'] 
            }],
            order: [['checkIn', 'DESC']]
        });

// Pastikan tidak ada module.exports di sini.