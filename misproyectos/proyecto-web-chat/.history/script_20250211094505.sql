-- Crear la base de datos y la tabla messages
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp TEXT NOT NULL
);

-- Agregar índices para mejorar el rendimiento de las consultas
CREATE INDEX idx_username ON messages (username);
CREATE INDEX idx_timestamp ON messages (timestamp);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    ip_address TEXT NOT NULL,
    online INTEGER DEFAULT 0
);

CREATE INDEX idx_username ON users (username);
CREATE INDEX idx_ip_address ON users (ip_address);
