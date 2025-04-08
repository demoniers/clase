import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class Escritura {
    public static void main(String[] args) {
        String rutaArchivo = "../tareas.txt";
        StringBuilder contenido = new StringBuilder();
        StringBuilder archivoContent = new StringBuilder();

        // Leer el contenido existente del archivo
        try (BufferedReader leer = new BufferedReader(new FileReader(rutaArchivo))) {
            String linea;
            while ((linea = leer.readLine()) != null) {
				System.out.printf("%s %n",linea);
                archivoContent.append(linea).append("\n");
				if (linea == "5") {
					System.out.printf("hola");
				} 
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Pedir al usuario que introduzca la fecha
        try (Scanner sc = new Scanner(System.in)) {
            System.out.printf("Introduce la fecha de este mes en la cual será el evento: %n");
            int dia = sc.nextInt();
            contenido.append("\n").append(dia).append("\n");
        }

        // Escribir el nuevo contenido en el archivo
        try (FileWriter escritor = new FileWriter(rutaArchivo, true)) {
            escritor.write(contenido.toString());
            System.out.println("Contenido escrito exitosamente.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
