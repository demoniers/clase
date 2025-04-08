javac -d bin src/*.java
jar cvfm proyecto.jar MANIFEST.MF -C bin .
java -jar proyecto.jar
pause
