package controller;

import java.util.Timer;
import java.util.TimerTask;
import model.IModel;
import view.IMainView;
import view.MainTerminalView;

public class MainController {

    private IModel model;
    private IMainView mainView;

    public MainController() {
        //this.model;
        this.mainView = new MainTerminalView();
    }

    public void run() {
        new StopWatch(10);

        int option = mainView.mainMenu();

        switch (option) {
            case 0: // Salir
                mainView.exit();
                break;

            case 1: // Listar libros
                break;

            case 2: // Añadir libro
                break;

            case 3:

                break;

            default:
        }
    }
}

class StopWatch {

	Timer timer;

    public StopWatch(int seconds) {
        timer = new Timer();
        timer.schedule(new StopTask(), seconds * 1000);
    }
	class StopTask extends TimerTask {
	  public void run() {
		System.out.println("Time Up!");
		timer.cancel();
	  }
  }
}