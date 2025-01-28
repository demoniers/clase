ALTER TABLE usuario
ADD COLUMN id_usuario INT;

ALTER TABLE libro DROP FOREIGN KEY libro_ibfk_2;

ALTER TABLE `libro` CHANGE `dni_usuario` `id_usuario` INT;

ALTER TABLE usuario DROP PRIMARY KEY;

ALTER TABLE libro
ADD PRIMARY KEY id_usuario;

ALTER TABLE usuario
ADD PRIMARY KEY id_usuario;

ALTER TABLE `usuario` CHANGE `id_usuario` `id_usuario` INT(11) NULL DEFAULT NULL AUTO_INCREMENT,
ADD PRIMARY KEY (`id_usuario`);

ALTER TABLE usuario
ADD UNIQUE (dni);

ALTER TABLE libro
ADD FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) on delete
set null on update cascade;

RENAME TABLE escribe TO escribe_libros;

ALTER TABLE libro
ADD PRIMARY KEY (titulo, isbn);

ALTER TABLE usuario COMMENT "Con el objetivo, de en un futuro. poder borrar el DNI del usuario de la base de datos hemos cambiado el DNI del usuario por oro campo id_usuario";