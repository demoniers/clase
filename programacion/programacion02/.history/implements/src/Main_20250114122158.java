public class Main {
    public static void main(String[] args) {
        Barco barco = new Barco();
        Avion avion = new Avion();
        Coche coche = new Coche();
        System.out.println("Un barco a 5Km/H ira a " + barco.kmhToMph(30) + " mph");
        System.out.println("Un coche a 5Km/H ira a " + coche.kmhToMph(150) + " mph");
        System.out.println("Un Avion a 5Km/H ira a " + avion.kmhToMph(500) + " mph");
    }
}
