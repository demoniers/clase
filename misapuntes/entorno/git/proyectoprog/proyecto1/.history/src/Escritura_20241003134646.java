import java.io.FileWriter;
import java.io.IOException;

public class Escritura {
	public static void main(String[] args) throws Exception {
		
		String rutaArchivo = "../tareas.txt";
		Scanner dia = new Scanner(System.in);
		Scanner tarea = new Scanner(System.in);
		String contenido = "¡Hola, mundo!\n";
		
		try (FileWriter escritor = new FileWriter(rutaArchivo, true)) {
			escritor.write(contenido);
            System.out.println("Contenido escrito exitosamente.");
        }
	}
}
