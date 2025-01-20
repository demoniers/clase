import java.io.File;
import java.util.Scanner;
import view.MainView;

public class Main {
    public static void main(String[] args) {
        String cfgroute = "../book.config"; // C:\Users\alumnofp\Desktop\clase\programacion\programacion02\proyecto001\book.config
        String config = loadConfig(cfgroute);
        MainView view = new MainView();
        view.RunRutin();
        System.out.println(config);
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
