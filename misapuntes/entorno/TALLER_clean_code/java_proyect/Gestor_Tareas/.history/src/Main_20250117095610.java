public class Main {
    public static void main(String[] args) {
        GestorDeTareasImpl gestor = new GestorDeTareasImpl();

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
