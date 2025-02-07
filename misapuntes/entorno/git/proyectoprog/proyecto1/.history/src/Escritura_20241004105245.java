import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class Escritura {
    public static void main(String[] args) {
        String rutaArchivo = "../tareas.txt";
        StringBuilder contenido = new StringBuilder();
		StringBuilder archivo = new StringBuilder();

        try (BufferedReader leer = new BufferedReader(new FileReader(rutaArchivo))) {
            String linea;
            while ((linea = br.readLine()) != null) {
                archivo.append(linea).append("\n");
            }
        }

        try (Scanner sc = new Scanner(System.in)) {
            System.out.printf("Introduce la fecha de este mes en la cual será el evento: %n");
            int dia = sc.nextInt();
            contenido.append("\n").append(dia).append("\n");
        }

        try (FileWriter escritor = new FileWriter(rutaArchivo, true)) {
            escritor.write(contenido.toString());
            System.out.println("Contenido escrito exitosamente.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
