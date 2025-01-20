@echo off
REM Compilar los archivos .java en la carpeta bin
javac -d bin src/Main.java src/view/*.java src/controller/*.java src/model/*.java src/model/entidades/*.java src/model/repository/*.java src/utils/*.java

REM Crear el archivo .jar con el manifiesto
jar cvfm proyecto.jar MANIFEST.MF -C bin . src/config/book.config

REM Ejecutar el archivo .jar
java -jar proyecto.jar

pause
