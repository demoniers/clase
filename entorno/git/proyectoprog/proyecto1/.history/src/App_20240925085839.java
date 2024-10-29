import java.util.Scanner; 


public class App {
    public static void main(String[] args) throws Exception {
		scanner llave = new Scanner(System.in);
		/*int key = 3;*/
		System.out.printf("Introudce tu llave");
		int key = llave.nextInt();
		boolean  cerradura = false;
		if (key == 5) {
			System.out.printf("Puerta abierta");
		} else if (cerradura == true ) {
			System.out.printf("Puerta abierta");
		} else {
			System.out.printf("Puerta cerrada");
		}
		

    }
}
