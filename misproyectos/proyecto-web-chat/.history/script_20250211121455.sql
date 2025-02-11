-- Crear la tabla de mensajes
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp TEXT NOT NULL
);

-- Crear la tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    identifier TEXT NOT NULL UNIQUE,
    online INTEGER DEFAULT 0
);
ALTER TABLE messages ADD COLUMN recipient TEXT;

-- Índices para mejorar el rendimiento
CREATE INDEX idx_username_messages ON messages (username);
CREATE INDEX idx_timestamp ON messages (timestamp);
CREATE INDEX idx_username_users ON users (username);
CREATE INDEX idx_identifier ON users (identifier);
