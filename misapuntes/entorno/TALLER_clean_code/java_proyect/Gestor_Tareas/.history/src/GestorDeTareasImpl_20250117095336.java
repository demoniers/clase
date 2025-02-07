public interface GestorDeTareas {
    void agregarTarea(Tarea tarea);
    void eliminarTarea(String nombre);
    Tarea buscarTarea(String nombre);
    void mostrarTareas();
}
import java.util.ArrayList;
import java.util.List;

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
