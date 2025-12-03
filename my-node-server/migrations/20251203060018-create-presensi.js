// migrations/20251203060018-create-presensi.js (FINAL FIXED CODE)

'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Presensis', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    // KOLOM RELASI USER
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users", 
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    checkIn: {
      allowNull: false,
      type: Sequelize.DATE
    },
    checkOut: {
      type: Sequelize.DATE
    },
    // KOLOM LATITUDE/LONGITUDE TIDAK ADA DI SINI!
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Presensis');
}