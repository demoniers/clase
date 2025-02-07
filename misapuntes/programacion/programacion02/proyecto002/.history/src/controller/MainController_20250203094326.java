package controller;

import model.IModel;
import view.IMainView;
import view.MainTerminalView;

public class MainController  {
	private IModel model;
	private IMainView mainView;
	
	public MainController() {
		this.model;
		this.mainView = new MainTerminalView();
	}
	
	public void run() {
		mainView.hello();
	}
}
