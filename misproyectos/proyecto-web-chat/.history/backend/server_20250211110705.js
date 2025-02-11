const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const forge = require('node-forge');
const os = require('os');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const db = new sqlite3.Database('database.sqlite');

app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());

// Crear tablas
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, message TEXT, timestamp TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, identifier TEXT NOT NULL UNIQUE, online INTEGER DEFAULT 0)');
});

// Obtener la IP local
function getLocalIp() {
    const networkInterfaces = os.networkInterfaces();
    for (let iface in networkInterfaces) {
        for (let alias of networkInterfaces[iface]) {
            if (alias.family === 'IPv4' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return null;
}

// Verificar IP/MAC y registrar usuario si es necesario
app.post('/verify-identifier', (req, res) => {
    const { username } = req.body;
    const localIp = getLocalIp();

    db.get('SELECT * FROM users WHERE identifier = ?', [localIp], (err, row) => {
        if (err) {
            return res.status(500).send('Error checking identifier');
        }
        if (row) {
            // Si el identificador ya está registrado, devolver el usuario
            return res.json({ username: row.username });
        } else {
            // Si el identificador no está registrado, registrar nuevo usuario
            db.run('INSERT INTO users (username, identifier, online) VALUES (?, ?, ?)', [username, localIp, 1], function(err) {
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
});

// Obtener usuarios en línea
app.get('/online-users', (req, res) => {
    db.all('SELECT username FROM users WHERE online = 1', [], (err, rows) => {
        if (err) {
            return res.status(400).send('Error fetching online users');
        }
        res.json(rows);
    });
});

// Manejar conexión de Socket.io
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        db.run('INSERT INTO messages (username, message, timestamp) VALUES (?, ?, ?)', [msg.username, msg.message, new Date().toISOString()]);
        io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
