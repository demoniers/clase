import java.util.ArrayList;
import java.util.Scanner;

public class Ejercicio1 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Introduce un número: ");
        int n = scanner.nextInt();
        scanner.nextLine(); // Consumir salto de línea

        ArrayList<String> personas = new ArrayList<>();
        for (int i = 1; i <= n; i++) {
            System.out.print("Introduzca el nombre " + i + ": ");
            String nombre = scanner.nextLine();
            personas.add(nombre);
        }

        System.out.println(personas);

        while (!personas.isEmpty()) {
            System.out.print("Introduce un número entre 0 y " + (n - 1) + ": ");
            int p = scanner.nextInt();

            if (p >= 0 && p < personas.size()) {
                personas.remove(p);
                System.out.println("Quedan " + personas.size() + " nombres");
            } else {
                System.err.println("No hay ningún nombre almacenado en la posición " + p);
            }
        }

        System.out.println("Se han eliminado todos los nombres.");
        scanner.close();
    }
}
