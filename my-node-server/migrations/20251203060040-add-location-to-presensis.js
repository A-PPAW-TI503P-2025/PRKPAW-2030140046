// migrations/20251203060040-add-location-to-presensis.js (FINAL FIXED CODE)

'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  // Tambahkan kolom latitude
  await queryInterface.addColumn('Presensis', 'latitude', {
    type: Sequelize.DECIMAL(10, 8),
    allowNull: true
  });
  
  // Tambahkan kolom longitude
  await queryInterface.addColumn('Presensis', 'longitude', {
    type: Sequelize.DECIMAL(11, 8),
    allowNull: true
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('Presensis', 'latitude');
  await queryInterface.removeColumn('Presensis', 'longitude');
}