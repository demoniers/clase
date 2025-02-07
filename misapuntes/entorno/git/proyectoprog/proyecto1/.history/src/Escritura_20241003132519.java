import java.io.FileWriter;
import java.io.IOException;

public class Escritura {
	public static void main(String[] args) throws Exception {
		
		String rutaArchivo = "tareas.txt";
		String contenido = "¡Hola, mundo!";
		
		FileWriter escritor = new FileWriter(rutaArchivo)) {
			
            
			escritor.write(contenido);
            System.out.println("Contenido escrito exitosamente.");
        }
	}
}
