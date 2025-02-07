DROP DATABASE IF EXISTS elecciones_municipales;
CREATE DATABASE IF NOT EXISTS elecciones_municipales;
USE elecciones_municipales;
# Script para crear partidos_politicos y politicos
create table partidos_politicos
(siglas char (4) primary key,
id_partido int unique,
nombre varchar(30),
direccion varchar(30),
Localidad varchar(30),
Fecha_alta date);

create table politicos (
dni varchar(10) primary key,
partido char(4),
primer_apellido varchar (25),
segundo_apellido varchar (25),
Edad int,
foreign key (partido) references partidos_politicos(siglas));



CREATE TABLE IF NOT EXISTS municipios (
    cod_municipio INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(25) NOT NULL,
    provincia VARCHAR(25) NOT NULL,
    numero_censados INT NOT NULL,
    tipo VARCHAR(25)
);
CREATE TABLE Colegios_electorales (
    cod_municipio INT,
    cod_colegio INT,
    direccion VARCHAR(50),
    nombre VARCHAR(50),
    CONSTRAINT FK_cod_municipio FOREIGN KEY (cod_municipio) REFERENCES municipios(cod_municipio),
    CONSTRAINT PK_Provincias PRIMARY KEY (cod_municipio, cod_colegio)
);
CREATE TABLE IF NOT EXISTS mesa_electoral (
    distrito INT,
    seccion INT,
    letra CHAR(1),
    cod_municipio INT,
    cod_colegio INT,
    CONSTRAINT FK_Municipio FOREIGN KEY (cod_municipio, cod_colegio) REFERENCES Colegios_electorales(cod_municipio, cod_colegio),
    CONSTRAINT PK_Mesa PRIMARY KEY (distrito, seccion, letra)
);


CREATE TABLE IF NOT EXISTS candidatos (
    dni VARCHAR(10) PRIMARY KEY,
    puesto VARCHAR(50) NOT NULL,
    municipio INT,
    CONSTRAINT FK_Candidatos FOREIGN KEY (dni) REFERENCES politicos(dni) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT FK_Candidatos2 FOREIGN KEY (municipio) REFERENCES municipios(cod_municipio) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS elegido (
    dni VARCHAR(10) PRIMARY KEY,
    cargo varchar(50),
    municipio INT,
    CONSTRAINT FK_Elegido FOREIGN KEY (dni) REFERENCES politicos(dni) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT FK_Elegido2 FOREIGN KEY (municipio) REFERENCES municipios(cod_municipio) ON UPDATE CASCADE
);
CREATE TABLE obtiene_votos (
    distrito INT, 
    seccion INT,
    letra CHAR(1),
    siglas CHAR(4),
    num_votos INT NOT NULL,
    CONSTRAINT FK_Resultado FOREIGN KEY (siglas) REFERENCES partidos_politicos(siglas) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT PK_resultados PRIMARY KEY (distrito, seccion, letra)
);

CREATE TABLE resultados_municipio (
    cod_municipio INT, 
    siglas CHAR(4),
    por_votos DECIMAL(5,2) NOT NULL,
    num_concejales INT,
    num_votos INT,
    CONSTRAINT PK_resultados PRIMARY KEY (cod_municipio, siglas),
    CONSTRAINT FK_Resultado FOREIGN KEY (siglas) REFERENCES partidos_politicos(siglas) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_Resultado2 FOREIGN KEY (cod_municipio) REFERENCES municipios(cod_municipio) ON DELETE CASCADE ON UPDATE CASCADE
)