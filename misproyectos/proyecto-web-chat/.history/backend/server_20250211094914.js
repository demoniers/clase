const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const forge = require('node-forge');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const db = new sqlite3.Database('database.sqlite');

app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());

// Crear tablas
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, message TEXT, timestamp TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, ip_address TEXT NOT NULL, online INTEGER DEFAULT 0)');
});

// Registrar usuario
app.post('/register', async (req, res) => {
    const { username, password, ip_address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (username, ip_address) VALUES (?, ?)', [username, ip_address], function(err) {
        if (err) {
            return res.status(400).send('Error registering user');
        }
        const token = jwt.sign({ username }, 'secret_key');
        res.json({ token });
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
