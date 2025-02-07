package controller;

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
		int option = mainView.mainMenu();
		
		switch(option) {
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