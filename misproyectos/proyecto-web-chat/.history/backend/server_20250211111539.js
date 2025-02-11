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

// Registrar o verificar el identificador (IP local) del usuario
io.use((socket, next) => {
    const ipAddress = socket.handshake.address;
    socket.ipAddress = ipAddress;
    next();
});

io.on('connection', (socket) => {
    socket.on('verify-identifier', (data) => {
        const { username } = data;
        const identifier = socket.ipAddress;

        db.get('SELECT * FROM users WHERE identifier = ?', [identifier], (err, row) => {
            if (err) {
                socket.emit('error', 'Error checking identifier');
                return;
            }
            if (row) {
                // Si el identificador ya está registrado, devolver el usuario
                socket.emit('verified-identifier', { username: row.username });
            } else {
                // Si el identificador no está registrado, registrar nuevo usuario
                db.run('INSERT INTO users (username, identifier, online) VALUES (?, ?, ?)', [username, identifier, 1], function(err) {
                    if (err) {
                        socket.emit('error', 'Error registering user');
                        return;
                    }
                    socket.emit('verified-identifier', { username });
                });
            }
        });
    });

    socket.on('chat message', (msg) => {
        db.run('INSERT INTO messages (username, message, timestamp) VALUES (?, ?, ?)', [msg.username, msg.message, new Date().toISOString()]);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        db.run('UPDATE users SET online = 0 WHERE identifier = ?', [socket.ipAddress], (err) => {
            if (err) {
                console.log('Error updating status on disconnect');
            }
        });
    });
});

app.get('/online-users', (req, res) => {
    db.all('SELECT username FROM users WHERE online = 1', [], (err, rows) => {
        if (err) {
            return res.status(400).send('Error fetching online users');
        }
        res.json(rows);
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
