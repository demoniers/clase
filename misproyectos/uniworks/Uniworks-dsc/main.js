// 5 hora 20 min ### 

const { Client, GatewayIntentBits } = require('discord.js');
const sqlite3 = require('sqlite3').verbose();

// Importar módulos
const registerEvents = require('./events.js');
const registerAdmin = require('./admin.js');
const comands = require('./comands.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent // Asegúrate de que este intent sea habilitado
    ],
});

// Crear o conectar a la base de datos
const db = new sqlite3.Database('./uwies.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

// Crear tablas si no existen
db.run('CREATE TABLE IF NOT EXISTS puntos (user_id TEXT PRIMARY KEY, points INTEGER)');
db.run(`CREATE TABLE IF NOT EXISTS bonus (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        admin_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        descripcion TEXT,
        fecha_bonus DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
);
db.run(`
    CREATE TABLE IF NOT EXISTS drops (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        admin_id TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        puntos INTEGER NOT NULL
    )`
);

// Registrar eventos y comandos administrativos
registerEvents(client, db);
registerAdmin(client, db);
comands(client);

client.login('');
