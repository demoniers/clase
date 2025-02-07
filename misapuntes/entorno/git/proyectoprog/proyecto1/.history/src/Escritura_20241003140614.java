import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class Escritura {
	public static void main(String[] args) throws Exception {
		
		String rutaArchivo = "../tareas.txt";
		try(Scanner sc = new Scanner(System.in)) {
			System.out.printf("Introduce la fecha de este mes en la cuel sera el evento %n");
			int dia = sc.nextInt();
			
		}

		String contenido = ("\n",dia,"\n");
		
		try (FileWriter escritor = new FileWriter(rutaArchivo, true)) {
			escritor.write(dia);
            System.out.println("Contenido escrito exitosamente.");
        }
	}
}
