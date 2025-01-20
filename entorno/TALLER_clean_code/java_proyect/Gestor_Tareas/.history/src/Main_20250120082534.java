import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        GestorDeTareasImpl gestor = new GestorDeTareasImpl();
        Scanner scan = new Scanner(System.in);

        int control = 0;
        while (control == 0) {
            System.out.print("Qué deseas hacer:\n<================>\n1. Crear actividad\n2. Listar las Actividades\n3. Buscar Tarea\n0. Salir\n");
            int seleccion = scan.nextInt();
            scan.nextLine(); // Consumir la línea pendiente
            switch (seleccion) {
                case 1 -> {
                    int control_interno = 0;
                    while (control_interno == 0) {
                        System.out.print("Creación de tarea\n\nSeleccione la opción adecuada\n1. Tarea básica\n2. Tarea con Prioridad\n0. Salir\n");
                        int selector = scan.nextInt();
                        scan.nextLine(); // Consumir la línea pendiente
                        if (selector == 1) {
                            System.out.println("Introduce el título de la tarea");
                            String titulo = scan.nextLine();
                            System.out.println("Introduce la descripción");
                            String descripcion = scan.nextLine();
                            Tarea tarea = new Tarea(titulo, descripcion);
                            gestor.agregarTarea(tarea);
                        } else if (selector == 2) {
                            System.out.println("Introduce el título de la tarea");
                            String titulo = scan.nextLine();
                            System.out.println("Introduce la descripción");
                            String descripcion = scan.nextLine();
                            System.out.println("Introduce el nivel de prioridad");
                            int prioridad = scan.nextInt();
                            scan.nextLine(); // Consumir la línea pendiente
                            Tarea tareaPrio = new TareaConPrioridad(titulo, descripcion, prioridad); 
                            gestor.agregarTarea(tareaPrio);
                        } else {
                            control_interno = 1;
                        }
                    }
                }
                case 2 -> gestor.mostrarTareas();
                case 3 -> {
                    System.out.println("Introduce el título de la tarea a buscar:");
                    String titulo = scan.nextLine();
                    Tarea tareaBuscada = gestor.buscarTarea(titulo);
                    if (tareaBuscada != null) {
                        System.out.println("Deseas modificar la Tarea: (s/n)");
                        String eleccion = scan.nextLine();
                        if (eleccion.equals("s")) {
                            System.out.println("Qué desea modificar\n1. El título: " + tareaBuscada.getNombre() + "\n2. La descripción: " + tareaBuscada.getDescripcion() + "\n3. El estado: " + tareaBuscada.getEstado());
                            int eleccion_n = scan.nextInt();
                            scan.nextLine(); // Consumir la línea pendiente
                            switch (eleccion_n) {
                                case 1 -> {
                                    System.out.println("Título actual: " + tareaBuscada.getNombre() + "  Nuevo título: ");
                                    String new_titulo = scan.nextLine();
                                    tareaBuscada.setNombre(new_titulo);
                                }
                                case 2 -> {
                                    System.out.println("Descripción actual: " + tareaBuscada.getDescripcion() + "  Nueva descripción: ");
                                    String new_descripcion = scan.nextLine();
                                    tareaBuscada.setDescripcion(new_descripcion);
                                }
                                case 3 -> {
                                    System.out.println("Estado actual: " + tareaBuscada.getEstado() + " Nuevo estado: ");
                                    String new_estado = scan.nextLine();
                                    tareaBuscada.setEstado(new_estado);
                                }
                                default -> System.out.println("No elegiste una opción válida");
                            }
                        }
                    } else {
                        System.out.println("No existe la tarea " + titulo);
                    }
                }
                case 0 -> {
                    System.out.println("Saliendo...");
                    control = 1;
                }
                default -> System.out.println("Opción no válida");
            }
        }

        gestor.mostrarTareas();
        scan.close();
    }
}
0