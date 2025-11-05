const { Presensi } = require("../../models");
const { Op } = require("sequelize");

exports.getDailyReport = async (req, res) => {
  try {
    const { nama, tanggalMulai, tanggalSelesai } = req.query;
    let options = { where: {} };

    // Filter 1: Berdasarkan Nama
    if (nama) {
      options.where.nama = {
        [Op.like]: `%${nama}%`,
      };
    }

    // Filter 2: Rentang atau Satu Tanggal
    if (tanggalMulai && tanggalSelesai) {
      const startDate = new Date(tanggalMulai);
      const endDate = new Date(tanggalSelesai);
      endDate.setHours(23, 59, 59, 999);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({
          message: "Validasi Gagal",
          error: "Format tanggalMulai atau tanggalSelesai tidak valid.",
        });
      }

      options.where.checkIn = {
        [Op.between]: [startDate, endDate],
      };

    } else if (tanggalMulai && !tanggalSelesai) {
      // ✅ Filter satu tanggal (tanggalMulai saja)
      const startDate = new Date(tanggalMulai);
      const endDate = new Date(tanggalMulai);
      endDate.setHours(23, 59, 59, 999);

      if (isNaN(startDate.getTime())) {
        return res.status(400).json({
          message: "Validasi Gagal",
          error: "Format tanggalMulai tidak valid.",
        });
      }

      options.where.checkIn = {
        [Op.between]: [startDate, endDate],
      };
    }

    // ✅ Ambil data dari database
    const records = await Presensi.findAll(options);

    // ✅ Kirim hasil ke client
    res.json({
      reportDate: new Date().toLocaleDateString("id-ID"),
      total: records.length,
      data: records,
    });

  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil laporan",
      error: error.message,
    });
  }
};
