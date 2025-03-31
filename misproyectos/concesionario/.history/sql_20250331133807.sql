PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    dni TEXT UNIQUE NOT NULL,
    correo TEXT UNIQUE NOT NULL,
    movil TEXT NOT NULL,
    tipo_usuario INTEGER NOT NULL,
    contrasena TEXT NOT NULL,
    profile_img VARCHAR(255) DEFAULT 'default.jpg'
);

INSERT INTO usuarios VALUES
    (1, 'Diego', 'Ruiz', '45616578L', 'admin@admin.es', '600987123', 9, '$2b$10$hOPwwUUrm90fUNCBqzfQYu9xWMKtHRZxAXcW1S95wX86vvrnUhxga', 'profile_6_1742905686129.png'),
    (2, 'Sergio', 'Salinas', '78652198P', 'sergo@admin.es', '600123789', 0, '$2b$10$Cn2csrtlL0/6mUf.c7qF0OhWMA0xF.bcHWzmEHo/txL0/wl.cQ2wa', 'profile_8_1743075429288.png');

CREATE TABLE alquileres (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    id_coche INTEGER NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    precio_total REAL NOT NULL,
    estado INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id),
    FOREIGN KEY (id_coche) REFERENCES coches (id)
);

INSERT INTO alquileres VALUES
    (1, 1, 5, '2025-03-28', '2025-03-29', 0.0, 0),
    (2, 1, 6, '2025-03-28', '2025-03-29', 0.0, 0),
    (3, 2, 1, '2025-03-31', '2025-04-01', 0.0, 0);

CREATE TABLE sqlite_sequence (
    name TEXT,
    seq INTEGER
);

INSERT INTO sqlite_sequence VALUES
    ('coches', 39),
    ('usuarios', 8),
    ('alquileres', 3);

COMMIT;
