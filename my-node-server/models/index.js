// my-node-server/models/index.js (FINAL FIXED CODE: Stabilitas Sinkron)

import path from 'path';
import { createRequire } from 'module'; 
import Sequelize from 'sequelize';

// --- IMPOR MODEL SECARA LANGSUNG ---
import UserModel from "./user.js"; 
import PresensiModel from "./presensi.js"; 
// --- END STATIC IMPORTS ---

const require = createRequire(import.meta.url); // Definisikan require untuk config JSON
const configJson = require('../config/config.json'); 

const env = process.env.NODE_ENV || 'development';
const config = configJson[env]; 

const db = {};
let sequelize;

// Inisialisasi Sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// 1. Daftarkan Model secara Statis ke objek db
db.User = UserModel(sequelize, Sequelize.DataTypes);
db.Presensi = PresensiModel(sequelize, Sequelize.DataTypes);


// 2. Menjalankan fungsi associate (Relasi)
// Logika ini harus dijalankan agar relasi terdaftar di Sequelize
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 3. Export database object
export default db;