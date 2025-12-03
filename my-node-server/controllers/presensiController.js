// my-node-server/controllers/presensiController.js (FINAL FIXED CODE)

import * as modelsWrapper from "../models/index.js"; 

const db = modelsWrapper.default;
const { Presensi, User, Sequelize } = db; // Ambil Sequelize (huruf besar) dari db

export const CheckIn = async (req, res) => {
    try {
        const { id: userId } = req.user; 
        const { latitude, longitude } = req.body; // Ambil data lokasi

        // ... (Logika validasi)

        const newRecord = await Presensi.create({
            userId: userId,
            checkIn: new Date(),
            latitude: latitude,  // Simpan data lokasi
            longitude: longitude, // Simpan data lokasi
        });

        return res.status(201).json({
            message: `Halo User ID ${userId}, check-in Anda berhasil.`,
            data: newRecord
        });

    } catch (error) {
        console.error("Error CheckIn:", error);
        return res.status(500).json({ 
            message: "Gagal melakukan Check-In",
            error: error.message 
        });
    }
};

export const CheckOut = async (req, res) => {
    try {
        const { id: userId } = req.user; 
        
        const today = new Date().toISOString().split('T')[0];
        const record = await Presensi.findOne({
            where: {
                userId: userId,
                checkOut: null,
                checkIn: Sequelize.literal(`DATE(checkIn) = DATE('${today}')`) 
            }
        });

        if (!record) {
            return res.status(404).json({ message: "Anda belum check-in hari ini atau sudah check-out." });
        }

        record.checkOut = new Date();
        await record.save();

        return res.json({
            message: `Halo User ID ${userId}, check-out Anda berhasil.`,
            data: record
        });

    } catch (error) {
        console.error("Error CheckOut:", error);
        return res.status(500).json({ 
            message: "Gagal melakukan Check-Out",
            error: error.message 
        });
    }
};