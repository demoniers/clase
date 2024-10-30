consuta.php

while ($row = $resultado->fechtassoc()) ´{
        for (i = 0; i < $RowNum; i++) {
            if ($curso !== $row['curso']) {
                imprime(curso)
                imprime(total_curso "total grupos + total de alumnos + t_asignaturas + precio a pagar")
            }
            if ($grupo !== $row['grupo']) {
                imprime(grupo)
                imprime(total_grupo "total de alumnos + t_asignaturas + precio a pagar")
            }
            imprime(alumno)
            for (a = 0; a < $n_asignatura; a++) {
                imprime(asignatura + precio)
            }
            imprime(totales_alumno "n_asignaturas + precio total a pagar")
        }
    }

}

// por pasos

CONSULTA(todos los cursos) {
    cuantos grupos hay en un curso
    for (recorret todos los grupos) {
        buscar alumnos por grupo
        Imprimir(alumno) {
            buscar asignaturas de alumno

            Codigo_Asignatura       Asignatura         TOTAL
            5598                    MATEMATICAS        500.00€

        }

    }
    

    CURSO ...............................
        GRUPO ...........................
            ALUMNO ......................
    codigo_asignatura       Nombre.......Precio(€)
            Total_Alumno ................
        Total_Grupo .....................
    Total_Curso .........................
Totales_Absolutos .......................

Formato -------------------------------------------------------------

TITULO CURSO (abreviado)
Titulo (Normal)

    Codigo_de_Grupo ----- Normbre Grupo

        N_expediente ........ Alumno
    fecha ................... Nombre ,,,,, Precio
        Totales ............. N_asignaturas ,,,, Total_€
    Total ................... T_alumnos ,,,,,,,, Toral_€
Total ......... T_grupo ----- T_alumnos ,,,,,,,, Toral_€











