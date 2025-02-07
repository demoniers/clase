import java.io.File;
import java.util.Scanner;
import view.MainView;

public class Main {
    public static void main(String[] args) {
        String cfgroute = "src\\config\\book.config"; // C:\Users\alumnofp\Desktop\clase\programacion\programacion02\proyecto001\book.config
        String config = loadConfig(cfgroute);
        System.out.println(config);
        MainView view = new MainView();
        view.RunRutin();
    }

    public static String loadConfig(String path) {
        String linea = "";
        try {
            File doc = new File(path);
           Scanner obj = new Scanner(doc);
           while (obj.hasNextLine()) {
               linea += obj.nextLine();
           }
           obj.close();
        } catch (Exception e) {
            linea = "Sin configuracion";
        }
        return linea;
    }
}
