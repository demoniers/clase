package com.project02.controller;

import com.project02.model.IModel;
import com.project02.view.IMainView;

public class MainController {
	private IModel model;
	private IMainView mainView;
	
	public MainController() {
		
	}
	
	public void run() {
		mainView.hello();
	}
}
