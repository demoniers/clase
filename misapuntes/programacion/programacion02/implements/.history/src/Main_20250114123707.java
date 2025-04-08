
public class Main {

    public static void main(String[] args) {
        Barco barco = new Barco();
        Avion avion = new Avion();
        Coche coche = new Coche();
        int km;
        km = 30;
        System.out.println("Un barco a " + km + "Km/H ira a " + barco.kmhToMph(30) + " mph");
        km = 120;
        System.out.println("Un coche a " + km + "Km/H ira a " + coche.kmhToMph(150) + " mph");
        km = 500;
        System.out.println("Un Avion a " + km + "Km/H ira a " + avion.kmhToMph(500) + " mph");
    }

}

interface Caracteristicas {

    double kmhToMph(double kmh);
}

class VehicleCharacteristics {

    int ruedas;

    public VehicleCharacteristics(int ruedas) {
        this.ruedas = ruedas;
    }
}

class Barco extends VehicleCharacteristics implements Caracteristicas {

    public Barco() {
        super(0);
    }

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
