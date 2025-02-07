package mysql.controller;

import mysql.model.sql.SqlManage;

public class MainController {
		SqlManage sql = new SqlManage();
		public boolean sqlUp() {
			return sql.comprobando();
		}
		public String select(String table) {
			return sql.select(table);
		}
		public void insertUser(String nombre) {
			sql.insertUser(nombre);
		}
		public void modificarUser(int id, String nombre) {
			sql.modificarUser(id, nombre);
		}
		public String salir() {
			return sql.close();
		}
}
