CREATE TABLE jefe (
    n_empleado INT(8) PRIMARY KEY,
    nombre VARCHAR(255),
    FOREIGN KEY (n_empleado) REFERENCES empleados(n_empleado) ON DELETE SET NULL /*ON UPDATE*/ 
)