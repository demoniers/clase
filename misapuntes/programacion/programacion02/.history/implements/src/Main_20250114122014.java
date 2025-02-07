public class Main {
    public static void main(String[] args) {
        Barco barco = new Barco();
        Avion airbus = new Avion();
        Coche seat = new Coche();
        System.out.println("Un barco a 5Km/H ira a " + barco.kmhToMph(30) + " mph");
        System.out.println("Un coche a 5Km/H ira a " + coche.kmhToMph(150) + " mph");
        System.out.println("Un Avion a 5Km/H ira a " + avion.kmhToMph(500) + " mph");
    }

    interface Caracteristicas {
        double kmhToMph(double kmh);
    }

    class Barco implements Caracteristicas {
        @Override
        public double kmhToMph(double kmh) {
            return kmh / 1.6094;
        }
    }
    class Avion implements Caracteristicas {
        @Override
        public double kmhToMph(double kmh) {
            return kmh / 1.6094;
        }
    }
    class Coche implements Caracteristicas {
        @Override
        public double kmhToMph(double kmh) {
            return kmh / 1.6094;
        }
    }
}
