package view;

import java.util.Scanner;

import javax.smartcardio.TerminalFactory;
import utils.TerminalUtils;

public class MainTerminalView
	implements IMainView {

	@Override
	public void hello() {
		TerminalUtils.output("  Bienvenido a AutoMotors \n ############################### \n seleccione la opcion a realizar \n ############################### ");
		TerminalUtils.output("1. Ver vehiculos en stock \n 2. Añadir vehiculo \n 3. Editar ficha de vehiculo \n 4. Eliminar vehiculo \n 0. Salir");
		{
        Scanner scanner = new Scanner(System.in);
        int opcion = -1;
        
        while (opcion != 0) {
            try { 
				opcion = Integer.parseInt(scanner.nextLine());

                switch (opcion) {
                    case 1:
                        System.out.println("Ver vehículos en stock");
                        // Aquí llamarías al método para ver los vehículos en stock
                        break;
                    case 2:
                        System.out.println("Añadir vehículo");
                        // Aquí llamarías al método para añadir un vehículo
                        break;
                    case 3:
                        System.out.println("Editar ficha de vehículo");
                        // Aquí llamarías al método para editar la ficha de un vehículo
                        break;
                    case 4:
                        System.out.println("Eliminar vehículo");
                        // Aquí llamarías al método para eliminar un vehículo
                        break;
                    case 0:
                        System.out.println("Salir");
                        break;
                    default:
                        System.out.println("Opción no válida. Por favor, seleccione una opción válida.");
                        break;
                }
            } catch (NumberFormatException e) {
                System.out.println("Entrada no válida. Por favor, introduzca un número.");
            }
        }

        
	}

}
