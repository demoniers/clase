
public class Main {

    public static void main(String[] args) {
        Barco barco = new Barco();
        Avion avion = new Avion();
        Coche coche = new Coche();
        int km;
        km = 30;
        System.out.print("Un barco con " + barco.ruedas + " y " + barco.kmt + " km totales; a " + km + "Km/H ira a " + barco.kmhToMph(30) + " mph\n");
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
    int kmt;

    public VehicleCharacteristics(int ruedas, int kmt) {
        this.ruedas = ruedas;
        this.kmt = kmt;
    }
}

class Barco extends VehicleCharacteristics implements Caracteristicas {
    public Barco() {
        super(0, 500);
    }

    @Override
    public double kmhToMph(double kmh) {
        return kmh / 1.6094;
    }
}

class Avion extends VehicleCharacteristics implements Caracteristicas {
    public Avion() {
        super(18, 00);
    }

    @Override
    public double kmhToMph(double kmh) {
        return kmh / 1.6094;
    }
}

class Coche extends VehicleCharacteristics implements Caracteristicas {
    public Coche() {
        super(5, 0);
    }

    @Override
    public double kmhToMph(double kmh) {
        return kmh / 1.6094;
    }
}
