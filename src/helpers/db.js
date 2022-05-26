const mysql = require("mysql2");
const dotenv = require('dotenv');
const { promisify } = require('util');
dotenv.config();

// Crear conexión pool base de datos
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
});

db.query = promisify(db.query);

module.exports = db;