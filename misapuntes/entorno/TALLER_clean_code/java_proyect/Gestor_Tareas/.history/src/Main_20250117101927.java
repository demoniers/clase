
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        GestorDeTareasImpl gestor = new GestorDeTareasImpl();
        Scanner scan = new Scanner(System.in);

        int control = 0;
        while (control == 0) {
            System.out.print("Que deseas hacer:\n<================>\n1. Crear actividad\n2. Listar las Actividades\n3. Buscar Tarea\n0. Salir");
            try {
                int seleccion = scan.nextInt();
                scan.next();
            } catch (Exception e) {
                System.out.print("No se ha introducido un numero valido debes introducir un numero entre 1 y 3");
            }
            switch (seleccion) {
                case 1:
                    int control_interno = 0;
                    while (control_interno == 0) {
                        System.out.print("Creacion de tarea\n\n Seleccione la opcion adecuada \n 1. Tarea basica \n 2. Tarea con Prioridad\n0. Salir");
                        int selector = scan.nextInt();
                        scan.next();
                        if (selector == 1) {
                            System.out.println("Introduce el titulo de la tarea");
                            String titulo = scan.nextLine();
                            System.out.println("Introduce la descripcion");
                            String descripcion = scan.nextLine();
                            Tarea tarea = new Tarea(titulo, descripcion);
                        } else if (selector == 2) {
                            System.out.println("Introduce el titulo de la tarea");
                            String titulo = scan.nextLine();
                            System.out.println("Introduce la descripcion");
                            String descripcion = scan.nextLine();
                            System.out.println("Introduce el nivel de prioridad");
                            int prioridad = nextInt();
                            scan.next();
                            Tarea tareaPrio = new TareaConPrioridad(titulo, descripcion, prioridad); 
                        } else {
                            control_interno = 1
                        }
                    }
                    break;
                case 2:
                    
                    break;
                case 3:
                    break;
                case 0:
                    control = 1;
                    break;
                default:
                    break;
            }
        }


        gestor.agregarTarea(tarea1);
        gestor.agregarTarea(tarea2);

        gestor.mostrarTareas();

        Tarea tareaBuscada = gestor.buscarTarea("Comprar leche");
        if (tareaBuscada != null) {
            tareaBuscada.setEstado("Completado");
        }

        gestor.mostrarTareas();
    }
}
