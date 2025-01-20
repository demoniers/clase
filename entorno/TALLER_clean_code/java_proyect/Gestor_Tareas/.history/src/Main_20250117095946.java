public class Main {
    public static void main(String[] args) {
        GestorDeTareasImpl gestor = new GestorDeTareasImpl();

        int control = 0;
        while (control = 0) {
            System.out.print("Que deseas hacer:\n<================>\n1. Crear actividad\n2. Listar las Actividades\n3. Buscar Tarea\n");
        }

        Tarea tarea1 = new Tarea("Comprar leche", "Comprar dos litros de leche");
        Tarea tarea2 = new TareaConPrioridad("Proyecto Java", "Terminar el proyecto de Java", 1);

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
