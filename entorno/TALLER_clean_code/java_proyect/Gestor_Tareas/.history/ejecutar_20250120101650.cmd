@echo off
REM Compilar los archivos .java en la carpeta bin
javac -d bin src\GestorDeTareasImpl.java src\Tarea.java src\Main.java

REM Crear el archivo .jar con el manifiesto
jar cvfm proyecto.jar MANIFEST.MF -C bin

REM Ejecutar el archivo .jar
java -jar proyecto.jar

pause
