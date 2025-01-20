
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