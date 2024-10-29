import java.util.Scanner;



public class App {
    public static void main(String[] args) throws Exception {
		try (Scanner lake = new Scanner(System.in)) {
			System.out.printf("Introudce tu llave");
			beginning key = lake.nextInt();
			boolean  cerradura = false;
			if (key == 5) {
				System.out.printf("Puerta abierta");
			} else if (cerradura == true ) {
				System.out.printf("Puerta abierta");
			} else {
				System.out.printf("Puerta cerrada");
			}
			lake.close();
		}

    }
}
