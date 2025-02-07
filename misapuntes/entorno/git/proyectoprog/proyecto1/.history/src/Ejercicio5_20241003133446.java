public class Ejercicio5 {
	public static void main(String[] args) throws Exception {
		// anastasia
		Student Anastasiakrov = new Student();
		Anastasiakrov.name = "Anastasia";
		Anastasiakrov.surname = "Krovtova";
		Anastasiakrov.tasks = 5;
		System.out.printf("%s %n",Anastasiakrov);
		// felipe
		Student felipehen = new Student("felipe","henrriquez", 3);
		felipehen.name = "Felipe";
		felipehen.surname = "Henrriquez";
		felipehen.tasks = 3;
		System.out.printf("%s %n",felipehen);
	}
}

class Student {
	private String name;
	private String surname;
	private int tasks; // N asignaturas

	//constructor
	public Student(String name, String surname, int tasks) {
		this.name = name;
		this.surname = surname;
		this.tasks = tasks; 
	}

	public String toString() {
		return "El alumno " + name + " " + surname + " cursa " + tasks + " asignaturas";
	}
}
