##3 EJECICIO 1
SELECT * FROM `autor` WHERE `fecha_nacimiento` > '1800-01-01' AND `fecha_nacimiento` < '1850-12-31';

## EJERCICIO 2
SELECT * FROM `autor` WHERE (YEAR(fecha_defuncion) - YEAR(fecha_nacimiento)) < 50;

## EJERCICIO 3
SELECT autor.nombre, opera.nombre, (YEAR(opera.fecha_estreno)-YEAR(autor.fecha_nacimiento)) as Edad_Autor FROM `autor` INNER JOIN opera ON autor.idautor = opera.autor_idautor WHERE (SELECT idautor FROM autor WHERE nombre = 'Giacomo Puccini');

## ejercicio 4
SELECT * FROM `autor` WHERE lugar_defuncion = lugar_nacimiento;

## ejercicio 5
SELECT * FROM `autor` WHERE nombre LIKE 'g%' AND nombre LIKE '%i';

## ejercio 6 
SELECT nombre, fecha_estreno, CASE WHEN idioma = 'F' THEN 'Frances' WHEN idioma = 'I' THEN 'Italiano' WHEN idioma = 'A' THEN 'Aleman' ELSE idioma END AS idioma FROM `opera` WHERE idioma IN('F', 'I', 'A');

## ejercicio 7
SELECT * FROM opera WHERE fecha_estreno < '1850-07-07';

## ejercicio 8
SELECT temporada.descripcion, opera.nombre FROM teatro INNER JOIN temporada ON teatro.idteatro = temporada.idtemporada INNER JOIN temporada_representa_opera AS r ON (SELECT idtemporada FROM temporada WHERE descripcion LIKE '%2015/2016') = r.temporada_idtemporada INNER JOIN opera ON r.opera_idopera = opera.idopera;

## ejercicio 9
SELECT * FROM autor INNER JOIN ciudad_pais AS d ON autor.lugar_defuncion = d.ciudad INNER JOIN ciudad_pais AS n ON autor.lugar_nacimiento = n.ciudad WHERE n.pais <> d.pais;

## ejercicio 10
SELECT n.pais, autor.nombre, opera.nombre FROM autor INNER JOIN ciudad_pais AS n ON autor.lugar_nacimiento = n.ciudad INNER JOIN opera ON autor.idautor = opera.autor_idautor WHERE n.pais LIKE 'Italia' ORDER BY autor.nombre DESC, opera.nombre;

## ejercicio 11
SELECT * FROM autor LEFT JOIN opera ON autor.idautor = opera.autor_idautor WHERE opera.autor_idautor IS NULL;

## ejercicio 12
SELECT autor.nombre, opera.nombre, temporada_representa_opera.fecha FROM autor INNER JOIN opera ON autor.idautor = opera.autor_idautor LEFT JOIN temporada_representa_opera ON opera.idopera = temporada_representa_opera.opera_idopera;

## ejercicio 13
SELECT * FROM opera LEFT JOIN temporada_representa_opera ON opera.idopera = temporada_representa_opera.opera_idopera WHERE opera.idioma LIKE 'A' AND temporada_representa_opera.opera_idopera IS NULL;

## ejercicio 14
SELECT * FROM opera ORDER BY idopera;

## ejercicio 15
SELECT autor.nombre, opera.nombre, ciudad_pais.pais FROM opera INNER JOIN autor ON opera.autor_idautor = autor.idautor INNER JOIN ciudad_pais ON opera.lugar_estreno = ciudad_pais.ciudad ORDER BY opera.nombre DESC LIMIT 5,2;
