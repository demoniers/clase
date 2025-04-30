-- Crear tabla para almacenar información de los restaurantes
CREATE TABLE restaurantes (
    id_restaurante INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    direccion TEXT NOT NULL,
    telefono TEXT,
    email TEXT,
    horario TEXT
);

-- Crear tabla para los tipos de platos
CREATE TABLE tipos_platos (
    id_tipo INTEGER PRIMARY KEY,
    descripcion TEXT NOT NULL
);

-- Insertar los diferentes tipos de platos
INSERT INTO tipos_platos (id_tipo, descripcion) VALUES (0, 'Entrante');
INSERT INTO tipos_platos (id_tipo, descripcion) VALUES (1, 'Plato principal');
INSERT INTO tipos_platos (id_tipo, descripcion) VALUES (2, 'Postre');
INSERT INTO tipos_platos (id_tipo, descripcion) VALUES (3, 'Tapa');
INSERT INTO tipos_platos (id_tipo, descripcion) VALUES (4, 'Plato Especial');

-- Crear tabla para los platos de los restaurantes
CREATE TABLE platos (
    id_plato INTEGER PRIMARY KEY AUTOINCREMENT,
    id_restaurante INTEGER NOT NULL,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio REAL NOT NULL,
    id_tipo INTEGER NOT NULL,
    FOREIGN KEY (id_restaurante) REFERENCES restaurantes (id_restaurante),
    FOREIGN KEY (id_tipo) REFERENCES tipos_platos (id_tipo)
);

-- Crear tabla para los menús del restaurante
CREATE TABLE menus (
    id_menu INTEGER PRIMARY KEY AUTOINCREMENT,
    id_restaurante INTEGER NOT NULL,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    opcion_libre BOOLEAN DEFAULT FALSE, -- Define si el menú es de opción libre
    FOREIGN KEY (id_restaurante) REFERENCES restaurantes (id_restaurante)
);

-- Crear tabla para relacionar menús y platos
CREATE TABLE menus_platos (
    id_menu INTEGER NOT NULL,
    id_plato INTEGER NOT NULL,
    FOREIGN KEY (id_menu) REFERENCES menus (id_menu),
    FOREIGN KEY (id_plato) REFERENCES platos (id_plato)
);

-- Crear tabla para los usuarios de la aplicación
CREATE TABLE usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_usuario TEXT NOT NULL UNIQUE,
    contrasena TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    rol INTEGER NOT NULL, -- Número para identificar el rol (ej.: 1 = admin, 2 = miembro de equipo, etc.)
    fecha_creacion TEXT DEFAULT CURRENT_TIMESTAMP -- Fecha de registro
);

-- Crear tabla para relacionar usuarios con restaurantes
CREATE TABLE usuarios_restaurantes (
    id_usuario_restaurante INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    id_restaurante INTEGER NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario),
    FOREIGN KEY (id_restaurante) REFERENCES restaurantes (id_restaurante)
);
