import java.io.FileWriter;
import java.io.IOException;

public class Escritura {
	public static void main(String[] args) throws Exception {
		
		String rutaArchivo = "../tareas.txt";
		String contenido = "¡Hola, mundo!2";
		
		try (FileWriter escritor = new FileWriter(rutaArchivo, true)) {
			escritor.write(contenido);
            System.out.println("Contenido escrito exitosamente.");
        }
	}
}
