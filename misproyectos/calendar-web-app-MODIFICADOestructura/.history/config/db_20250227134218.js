
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'tareas.db');
const db = new sqlite3.Database(dbPath);

// Crear las tablas si no existen
db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS tareas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descripcion TEXT NOT NULL,
        fecha DATE NOT NULL
      )
    `);
  
    db.run(`
      CREATE TABLE IF NOT EXISTS trabajos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descripcion TEXT NOT NULL,
        diasTrabajo TEXT NOT NULL,
        pago REAL NOT NULL,
        frecuenciaPago TEXT NOT NULL,
        fechaInicio DATE,
        fechaFin DATE
      )
    `);
  
    db.run(`
      CREATE TABLE IF NOT EXISTS competiciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descripcion TEXT NOT NULL,
        fechaInicio DATE NOT NULL,
        fechaFin DATE NOT NULL
      )
    `);
  });

  module.exports = db;