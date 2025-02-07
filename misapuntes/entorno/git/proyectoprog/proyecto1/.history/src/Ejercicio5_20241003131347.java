public class Ejercicio5 {
	public static void main(String[] args) throws Exception {
		// anastasia
		Student Anastasiakrov = new Student();
		Anastasiakrov.name = "Anastasia";
		Anastasiakrov.surname = "Krovtova";
		Anastasiakrov.tasks = 5;
		System.out.printf("%s %n",Anastasiakrov);
		// felipe
		Estudiante felipehen = new Estudiante();
		felipehen.name = "Felipe";
		felipehen.surname = "Henrriquez";
		felipehen.tasks = 3;
		System.out.printf("%s %n",felipehen);
	}
}

class Student {
	String name;
	String surname;
	int tasks; // N asignaturas

	public String toString() {
		return "El alumno " + nombre + " " + apellido + " cursa " + asignaturas + " asignaturas";
	}
}
