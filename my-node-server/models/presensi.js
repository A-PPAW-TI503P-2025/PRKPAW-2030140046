// my-node-server/models/presensi.js (FINAL FIXED CODE)

'use strict';
import { DataTypes } from 'sequelize'; 

export default (sequelize, DataTypes) => {
  const Presensi = sequelize.define('Presensi', {
    checkIn: { type: DataTypes.DATE, allowNull: false },
    checkOut: { type: DataTypes.DATE, allowNull: true },
    latitude: { type: DataTypes.DECIMAL(10, 8), allowNull: true },
    longitude: { type: DataTypes.DECIMAL(11, 8), allowNull: true },
  }, {});

  Presensi.associate = function(models) {
    // Definisi relasi Many-to-One
    Presensi.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user' // Relasi kembali ke User
    });
  };

  return Presensi;
};