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

        int opcion = -1;

        while (opcion != 0) {
            try {
                opcion = Integer.parseInt(TerminalUtils.inputText());

                switch (opcion) {
                    case 1 -> {
                        System.out.println("Ver vehículos en stock");
                    }
                    case 2 -> {
                        System.out.println("Añadir vehículo");
                    }
                    case 3 -> {
                        System.out.println("Editar ficha de vehículo");
                    }
                    case 4 -> {
                        System.out.println("Eliminar vehículo");
                    }
                    case 0 -> {
                        System.out.println("Salir");
                    }
                    default -> {
                        System.out.println("Opción no válida. Por favor, seleccione una opción válida.");
                    }
                }
            } catch (NumberFormatException e) {
                System.out.println("Entrada no válida. Por favor, introduzca un número.");
            }
        }
    }
}
