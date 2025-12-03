// my-node-server/models/user.js (FINAL FIXED CODE)

'use strict';
import { DataTypes } from 'sequelize'; 

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nama: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('mahasiswa', 'admin'), defaultValue: 'mahasiswa', allowNull: false },
  }, {});

  User.associate = function(models) {
    // Definisi relasi One-to-Many
    User.hasMany(models.Presensi, {
        foreignKey: 'userId',
        as: 'presensi' // Relasi ke tabel Presensi
    });
  };

  return User;
};