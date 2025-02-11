const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const db = new sqlite3.Database('database.sqlite');

app.use(express.static(path.join(__dirname, '../frontend')));

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, message TEXT, timestamp TEXT)');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        db.run('INSERT INTO messages (username, message, timestamp) VALUES (?, ?, ?)', [msg.username, msg.message, new Date().toISOString()]);
        io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});

/* 
ENCRIPTAR Y DESENCRIPTAR MENSAJES
*/
const forge = require('node-forge');

// Generar par de claves (privada y pública)
const keypair = forge.pki.rsa.generateKeyPair(2048);

// Cifrar el mensaje
function encryptMessage(publicKey, message) {
    const encrypted = publicKey.encrypt(forge.util.encodeUtf8(message));
    return forge.util.encode64(encrypted);
}

// Descifrar el mensaje
function decryptMessage(privateKey, encryptedMessage) {
    const decrypted = privateKey.decrypt(forge.util.decode64(encryptedMessage));
    return forge.util.decodeUtf8(decrypted);
}

/*
AUTOMATIZACION DE USUARIOS
*/
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const users = {}; // Ejemplo de almacenamiento de usuarios

// Registrar usuario
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users[username] = hashedPassword;
    res.send('User registered');
});

// Iniciar sesión
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userPassword = users[username];
    if (userPassword && await bcrypt.compare(password, userPassword)) {
        const token = jwt.sign({ username }, 'secret_key');
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});
