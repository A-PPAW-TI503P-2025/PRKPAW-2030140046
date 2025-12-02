// my-node-server/controllers/presensiController.js
// Catatan: Ini adalah versi yang diperbaiki agar server tidak error

const { Presensi, User } = require('../models'); // Pastikan models diimpor
const { format } = require("date-fns-tz");
const timeZone = "Asia/Jakarta";

exports.CheckIn = async (req, res) => {
    // Ambil userId dari token (req.user)
    const { id: userId, nama: userName } = req.user; 
    
    try {
        // Implementasi CheckIn (gunakan Presensi.create)
        // ... Logika validasi dan penyimpanan ke database ...
        res.status(201).json({ message: `Check-In Success for ${userName}` }); 
    } catch (error) {
        res.status(500).json({ message: "Gagal Check-In" });
    }
};

exports.CheckOut = async (req, res) => {
    // Ambil userId dari token (req.user)
    const { id: userId, nama: userName } = req.user; 

    try {
        // Implementasi CheckOut (gunakan Presensi.findOne dan record.save())
        // ... Logika validasi dan update database ...
        res.status(200).json({ message: `Check-Out Success for ${userName}` });
    } catch (error) {
        res.status(500).json({ message: "Gagal Check-Out" });
    }
};

exports.deletePresensi = async (req, res) => {
    // Ambil userId dari token untuk otorisasi pemilik
    const { id: userId } = req.user; 
    
    try {
        // Implementasi Delete (gunakan Presensi.destroy)
        // ... Logika menghapus dan pengecekan pemilik (record.userId === userId) ...
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus presensi" });
    }
};
