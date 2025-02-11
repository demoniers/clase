const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const forge = require('node-forge');
const requestIp = require('request-ip');
const osu = require('node-os-utils');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const db = new sqlite3.Database('database.sqlite');

app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());
app.use(requestIp.mw());

// Crear tablas
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, message TEXT, timestamp TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, identifier TEXT NOT NULL, online INTEGER DEFAULT 0)');
});

// Obtener dirección MAC
function getMacAddress() {
    return osu.os.netstat.inOut().then(stats => stats[0].interface);
}

// Verificar IP o dirección MAC y registrar usuario si es necesario
app.post('/verify-identifier', async (req, res) => {
    const ip_address = req.clientIp;
    const mac_address = await getMacAddress();
    const identifier = ip_address || mac_address;
    const { username } = req.body;

    db.get('SELECT * FROM users WHERE identifier = ?', [identifier], (err, row) => {
        if (err) {
            return res.status(500).send('Error checking identifier');
        }
        if (row) {
            // Si la IP o MAC ya está registrada, devolver el usuario
            return res.json({ username: row.username });
        } else {
            // Si la IP o MAC no está registrada, registrar nuevo usuario
            db.run('INSERT INTO users (username, identifier, online) VALUES (?, ?, ?)', [username, identifier, 1], function(err) {
                if (err) {
                    return res.status(400).send('Error registering user');
                }
                return res.json({ username });
            });
        }
    });
});

// Actualizar estado en línea
app.post('/update-status', (req, res) => {
    const { username, online } = req.body;
    db.run('UPDATE users SET online = ? WHERE username = ?', [online, username], (err) => {
        if (err) {
            return res.status(400).send('Error updating status');
        }
        res.send('Status updated');
    });
