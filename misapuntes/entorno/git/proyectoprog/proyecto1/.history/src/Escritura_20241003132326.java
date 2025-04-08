import java.io.FileWriter;
import java.io.IOException;

public class Escritura {
	public static void main(String[] args) throws Exception {
		FileWriter escritor = new FileWriter(rutaArchivo)) {
			
			String rutaArchivo = "archivo.txt";
			String contenido = "¡Hola, mundo!";


            escritor.write(contenido);
            System.out.println("Contenido escrito exitosamente.");
        } catch (IOException e) {
            System.err.println("Error al escribir en el archivo: " + e.getMessage());
        }
	}
}
