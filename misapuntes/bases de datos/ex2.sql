-- FUNCIONES ARITMÉTICAS
/*
AVG() Calcula la media aritmética 
MAX() Devuelve el valor mayor 
MIN() Devuelve el valor menor 
SUM() Devuelve la suma
COUNT() Cuenta
*/

-- FUNCIONES DE CADENAS DE CARACTERES
/*
LOWER(c): Devuelve la cadena “c” con todas las letras convertidas a minúsculas.
UPPER(c): Devuelve la cadena “c” con todas las letras convertidas a mayúsculas.
LTRIM(c): Elimina los espacios por la izquierda de la cadena “c”.
RTRIM(c): Elimina los espacios por la derecha de la cadena “c”.
REPLACE(c, b, s): Sustituye en la cadena “c” el valor buscado “b” por el valor indicado en “s”.
REPLICATE(c, n): Devuelve el valor de la cadena “c” el número de veces “n” indicado.
CONCAT(str1,str2,...): Devuelve la cadena que resulta de concatenar los argumentos.
LEFT(c, n): Devuelve “n” caracteres por la izquierda de la cadena “c”.
RIGHT(c, n): Devuelve “n” caracteres por la derecha de la cadena “c”.
SUBSTRING(c, m, n): Devuelve una sub-cadena obtenida de la cadena “c”, a partir de la posición “m” y tomando “n” caracteres.
LENGTH(c): Tamaño de la cadena de caracteres.
*/

-- FUNCIONES DE FECHAS
/*
ADDDATE(date, INTERVAL expr unit), ADDDATE(expr,days), DATE_ADD(date, INTERVAL value unit): añade expr a una fecha   
CURRENT_DATE() / CURRENT_TIME () / CURTIME () /CURRENT_TIMESTAMP() / NOW(): Nos da la fecha / hora actual / fecha y hora actual 
DATE(fecha): Selecciona la fecha del parámetro (desechando la hora:minutos:segundos) 
DATEDIFF (fecha, fecha): Devuelve el número de días entre esas dos fechas. 
DATE_SUB (fecha, INTERVAL exprunit): Resta expr a una fecha
DAYNAME(fecha), DAYOFMONTH(fecha), DAYOFWEEK(fecha), DAYOFYEAR(fecha) 
SYSDATE(): La fecha y hora del sistema. 
TIMEDIFF('hh:mm:ss', 'hh:mm:ss'): Devuelve la diferencia entre dos horas 
DATEFORMAT (date, format): dar formato a una fecha.
*/

-- FUNCIONES DE CONVERSIÓN
/*
CONVERT(input_value, data_type):  convertir valores de un tipo de datos otro tipo de datos diferente
*/

/* Fácil
Insertar los siguientes datos dentro de las tablas artistas, artistas_grupos, grupo. (2 ptos)

    Grupo Iron Maiden: fecha de creación 1975. 
    */
    INSERT INTO grupo (nombre, fecha_inicio) VALUES ("Iron Maiden:", 1975-1-1)
/*
    Componentes (Artistas):

        ("Bruce Dickinson", Nacimiento 7 agosto de 1985)

        ("Steve Harris", Nacimiento no se sabe)

        ("Dave Murray", 23 de diciembre de 1956)

        ("Nicko McBrain", 7 de agosto de 1958)*/
        INSERT INTO artistas (nombre, fecha_nac) VALUES 
            ("Bruce Dickinson", 1985-8-7),
            ("Steve Harris", NULL),
            ("Dave Murray", 1956-12-23),
            ("Nicko McBrain", 1958-8-7)
        /*

    Han tocado en el grupo Iron Maiden en las siguientes fechas (artistas_grupo). Realizar consultas para sacar los id. Poner en instrumento la inicial del instrumento o S para cantante. (2 ptos)

        Bruce Dickinson. Actividad:

            1981–1993. Cantante

            1999 – actualidad. Cantante.

        Steve Harris. Actividad: 1975 – actualidad. Bajo.

        Dave Murray. Actividad:

            1976-1977. Guitarra eléctrica

            1978 – actualidad. Guitarra eléctrica.

*/
INSERT INTO artistas_grupo (id_grupo, id_artista, fecha_inicio, fecha_fin, instrumento) VALUES
((SELECT id_grupo FROM grupo WHERE nombre = "Iron Maiden"), (SELECT id_artista FROM artistas WHERE nombre = "Bruce Dickinson"), 1981-1-1, 1993-1-1, "C"),
((SELECT id_grupo FROM grupo WHERE nombre = "Iron Maiden"), (SELECT id_artista FROM artistas WHERE nombre = "Bruce Dickinson"), 1999-1-1, NULL, "C"),
((SELECT id_grupo FROM grupo WHERE nombre = "Iron Maiden"), (SELECT id_artista FROM artistas WHERE nombre = "Steve Harris"), 1975-1-1, NULL, "B"),
((SELECT id_grupo FROM grupo WHERE nombre = "Iron Maiden"), (SELECT id_artista FROM artistas WHERE nombre = "Dave Murray"), 1976-1-1, 1977-1-1, "G"),
((SELECT id_grupo FROM grupo WHERE nombre = "Iron Maiden"), (SELECT id_artista FROM artistas WHERE nombre = "Dave Murray"), 1978-1-1, NULL, "G")





/* Medio
Insertaremos dentro de la tabla usuarios a todos los artistas que han tocado dentro de las grupos que tengamos almacenados (meter en usuarios, todos los artistas que están algún grupo de la tabla grupos). 
Utilizar algún comando para eliminar los duplicados que se pueden dar debido a que un artista puede haber estado en varios grupos.
Como nombre de usuario pondremos los 5 primeros dígitos del nombre unido con su id_artista. Como nombre, respetaremos su nombre normal. (3 ptos)
*/
INSERT INTO usuarios (nombreusuario, nombre)
SELECT CONCAT(LEFT(artistas.nombre, 5), artistas.id_artista) AS nombreusuario, artistas.nombre
FROM artistas_grupo
INNER JOIN artistas ON artistas.id_artista = artistas_grupo.id_artista
INNER JOIN grupo ON grupo.id_grupo = artistas_grupo.id_grupo
ORDER BY artistas_grupo.id_artista;




/* Medio
Crear una tabla llamada 'grupoAlbum' que tenga el nombre del grupo, el título del álbum, el título de la canción y la duración de la canción. Los datos los obtendremos de las tablas álbums, grupo y canciones. (3 ptos)
*/
CREATE TABLE `ex2`.`grupoAlbum` (
	id INT(8) PRIMARY KEY AUTO_INCREMENT,
    nombre_grupo VARCHAR(255),
    nombre_album VARCHAR(255),
    nombre_cancion VARCHAR(255),
    duracion VARCHAR(255)
);
INSERT INTO grupoalbum (nombre_grupo, nombre_album, nombre_cancion, duracion) 
SELECT grupo.nombre, albums.titulo, canciones.titulo, canciones.duracion FROM albums 
INNER JOIN canciones ON canciones.album = albums.id_album
INNER JOIN grupo ON albums.id_grupo = grupo.id_grupo;


/* Difícil
Añadir un nuevo campo en la tabla canciones con la siguiente sentencia

    Alter table canciones add duracion1 int.

    Actualiza el campo duracion1 con la duración de las canciones en segundos. Para ello multiplica los minutos por 60" y súmale los segundos. Ten en cuenta el tipo de dato de la columna 'duracion'. (2 ptos)
*/
UPDATE canciones AS c
INNER JOIN (
    SELECT id_cancion, duracion * 60 AS nueva_duracion
    FROM canciones
) AS subconsulta
ON c.id_cancion = subconsulta.id_cancion
SET c.duracion1 = subconsulta.nueva_duracion;






/* Fácil
Borrar todas las canciones de la tabla cancionesenlista del usuario Maria80. (2 ptos)
*/
DELETE FROM cancionesenlista WHERE nombreusuario = "Maria80"




/* Fácil
Crea un usuario con tu nombre y la contraseña 'exa', dale todos los permisos solo en la base de datos que estamos creando con la opción de poder cambiar permisos de otros usuarios. (3 ptos)
*/

CREATE USER 'exa'@'localhost' IDENTIFIED BY 'exa';
GRANT ALL PRIVILEGES ON ex2.* TO 'exa'@'localhost' WITH GRANT OPTION;




/* Fácil
Crea una copia de seguridad de toda la base de datos (datos y estructura) en un solo archivo con la opción de crear la BBDD y las estructuras. Este archivo lo subirás a la tarea junto con el script que estás generando para el examen. (2 ptos)
*/



