
import java.util.Scanner;
import javax.sound.midi.SysexMessage;
import javax.sound.sampled.TargetDataLine;

public class Main {
    public static void main(String[] args) {
        GestorDeTareasImpl gestor = new GestorDeTareasImpl();
        Scanner scan = new Scanner(System.in);

        int control = 0;
        int seleccion;
        while (control == 0) {
            System.out.print("Que deseas hacer:\n<================>\n1. Crear actividad\n2. Listar las Actividades\n3. Buscar Tarea\n0. Salir");
            try {
                seleccion = scan.nextInt();
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
                            gestor.agregarTarea(tarea);
                        } else if (selector == 2) {
                            System.out.println("Introduce el titulo de la tarea");
                            String titulo = scan.nextLine();
                            System.out.println("Introduce la descripcion");
                            String descripcion = scan.nextLine();
                            System.out.println("Introduce el nivel de prioridad");
                            int prioridad = scan.nextInt();
                            scan.next();
                            Tarea tareaPrio = new TareaConPrioridad(titulo, descripcion, prioridad); 
                            gestor.agregarTarea(tareaPrio);
                        } else {
                            control_interno = 1;
                        }
                    }
                    break;
                case 2:
                    gestor.mostrarTareas();                    
                    break;
                case 3:
                    System.out.print("Introduce el titulo de la tarea a buscar:\n");
                    String titulo =  scan.nextLine();
                    Tarea tareaBuscada = gestor.buscarTarea(titulo);
                    System.out.print("Deseas modificar la Tarea: (s/n)");
                    String eleccion = scan.nextLine();
                    if (eleccion.equals("s")) {
                        if (tareaBuscada != null) {
                            System.out.print("Que desea modificar \n 1. El titulo: "+tareaBuscada.getNombre()+"\n 2. La descripcion: "+tareaBuscada.getDescripcion()+"\n 3. El estado: "+tareaBuscada.getEstado());
                            int eleccion_n = scan.nextInt();
                            switch (eleccion_n) {
                                case 1:
                                    System.out.print("Titulo actual: "+tareaBuscada.getNombre()+"  Nuevo titulo: ");
                                    String new_titulo = scan.nextLine();
                                    tareaBuscada.setNombre(new_titulo);
                                    break;
                                case 2:
                                    System.out.print("Descripcion actual: "+tareaBuscada.getDescripcion()+"  Nuevo descripcion: ");
                                    String new_descripcion = scan.nextLine();
                                    tareaBuscada.setDescripcion(new_descripcion);
                                    break;
                                case 3:
                                    System.out.print("Estado actual: "+tareaBuscada.getEstado()+" Nuevo estado: ");
                                    String new_estado = scan.nextLine();
                                    tareaBuscada.setEstado(new_estado);
                                    break;
                                default:
                                    System.out.println("no elegiste una opcion valida");;
                            }
                        } else {
                            System.out.print("No existe la tarea "+titulo);
                        }
                    }
                    break;
                case 0:
                    control = 1;
                    break;
                default:
                    System.out.print("");
                    break;
            }
        }


        gestor.mostrarTareas();
    }
}
