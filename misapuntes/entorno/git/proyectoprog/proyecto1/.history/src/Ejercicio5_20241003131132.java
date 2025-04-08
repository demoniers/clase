public class Ejercicio5 {
	public static void main(String[] args) throws Exception {
		// anastasia
		Estudiante Anastasiakrov = new Estudiante();
		Anastasiakrov.nombre = "Anastasia";
		Anastasiakrov.apellido = "Krovtova";
		Anastasiakrov.asignaturas = 5;
		System.out.printf("%s %n",Anastasiakrov);
		// felipe
		Estudiante felipehen = new Estudiante();
		felipehen.nombre = "Felipe";
		felipehen.apellido = "Henrriquez";
		felipehen.asignaturas = 3;
		System.out.printf("%s %n",felipehen);
	}
}

class Estudiante {
	String nombre;
	String apellido;
	int asignaturas; // N asignaturas

	public String toString() {
		return "El alumno " + nombre + " " + apellido + " cursa " + asignaturas + " asignaturas";
	}
}
