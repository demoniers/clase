package mysql.view;

import mysql.model.sql.SqlManage;
import mysql.controller.MainController;
import mysql.utils.TerminalUtils;

public class MainView {
	SqlManage sql = new SqlManage();
	MainController control = new MainController();
	public void run() {
		boolean connection = control.sqlUp();
		if (connection == true) {
			TerminalUtils.output("conectado");
				int i = 1;
				int option = 0;
				while (i != 0) {
					TerminalUtils.output("Menu de la apliacion \n 1. mostrar datos \n 2. Añadir usuario \n 3. Modificar perfil \n  0. salir ");
					option = TerminalUtils.inputInt();
					switch (option) {
					case 1 -> {
						TerminalUtils.output("introduce la tabla en la que buscar");
						String table = TerminalUtils.inputText();
						TerminalUtils.output(control.select(table));
					}
					case 2 -> {
						TerminalUtils.output("introduce la el  nombre del usuario nuevo");
						String nombre = TerminalUtils.inputText();
						control.insertUser(nombre);
					}
					case 3 -> {
						TerminalUtils.output(control.select("usuarios")+"\n 0. Salir");
						TerminalUtils.output("Seleccione el id del usuario a modificar");
						int id = TerminalUtils.inputInt();
						if (id > 0) {
							TerminalUtils.output("introduce el nuveo nombre para el usuario con id "+id);
							String newName = TerminalUtils.inputText();
							control.modificarUser(id, newName);
						}
					}
						case 0  -> {
							TerminalUtils.output("Saliendo del programa \n"+control.salir());
							i = 0;
						}
						default -> {}
					}
				}
		} else {
			TerminalUtils.output("Hay un error en la conexion del a la base de datos");
		}
	}
}
