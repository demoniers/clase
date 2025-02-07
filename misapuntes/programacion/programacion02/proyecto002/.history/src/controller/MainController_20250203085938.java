package controller;

import model.IModel;
import view.IMainView;

public class MainController {
	private IModel model;
	private IMainView mainView;
	
	public MainController() {
		
	}
	
	public void run() {
		mainView.hello();
	}
}
