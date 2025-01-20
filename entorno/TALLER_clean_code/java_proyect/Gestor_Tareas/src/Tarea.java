/* Encapsulamiento ->
Los atributos nombre, descripcion y estado son privados y se accede a ellos a través de métodos públicos (getters y setters).
Modulos bien Definidos ->
La clase Tarea tiene métodos específicos para manejar su estado (getEstado, setEstado, etc.).
*/
public class Tarea {
    private String nombre;
    private String descripcion;
    private String estado;

    public Tarea(String nombre, String descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estado = "Pendiente"; // Estado inicial
    }

    public String getNombre() {
        return nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
/* Herencia --> 
La clase TareaConPrioridad hereda de Tarea, reutilizando sus atributos y métodos, y añadiendo el atributo prioridad.
Polimorfismo ->
Aunque no se muestra explícitamente en este ejemplo, TareaConPrioridad puede ser utilizada en lugar de Tarea en cualquier contexto donde se espera un objeto de tipo Tarea.
*/ 
class TareaConPrioridad extends Tarea {
    private int prioridad;

    public TareaConPrioridad(String nombre, String descripcion, int prioridad) {
        super(nombre, descripcion);
        this.prioridad = prioridad;
    }

    public int getPrioridad() {
        return prioridad;
    }

    public void setPrioridad(int prioridad) {
        this.prioridad = prioridad;
    }
}
