import java.util.ArrayList;
import java.util.List;

/* Segregación de Interfaces ->
 La interfaz GestorDeTareas contiene solo métodos relacionados con la gestión de tareas (agregarTarea, eliminarTarea, buscarTarea, mostrarTareas), lo que mantiene la interfaz enfocada y relevante.
*/
interface GestorDeTareas {
    void agregarTarea(Tarea tarea);
    void eliminarTarea(String nombre);
    Tarea buscarTarea(String nombre);
    void mostrarTareas();
}

/* Sustitución de Liskov ->
GestorDeTareasImpl implementa GestorDeTareas y puede ser utilizada en cualquier contexto donde se espera un GestorDeTareas, respetando los contratos definidos en la interfaz.
*/
public class GestorDeTareasImpl implements GestorDeTareas {
    private List<Tarea> tareas;

    public GestorDeTareasImpl() {
        this.tareas = new ArrayList<>();
    }

    @Override
    public void agregarTarea(Tarea tarea) {
        tareas.add(tarea);
    }

    @Override
    public void eliminarTarea(String nombre) {
        tareas.removeIf(t -> t.getNombre().equals(nombre));
    }

    @Override
    public Tarea buscarTarea(String nombre) {
        for (Tarea tarea : tareas) {
            if (tarea.getNombre().equals(nombre)) {
                return tarea;
            }
        }
        return null;
    }

    @Override
    public void mostrarTareas() {
        for (Tarea tarea : tareas) {
            System.out.println("Nombre: " + tarea.getNombre() +
                               ", Descripción: " + tarea.getDescripcion() +
                               ", Estado: " + tarea.getEstado());
        }
    }
}
