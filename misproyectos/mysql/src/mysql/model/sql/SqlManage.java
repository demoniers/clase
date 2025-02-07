package mysql.model.sql;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.xml.transform.Result;

import mysql.utils.TerminalUtils;

public class SqlManage {
    private static final String URL = "jdbc:mysql://localhost:3306/proyectjava?useSSL=false";
    private static final String USER = "root";
    private static final String PASSWORD = "";
    private Connection connection;

    public Boolean comprobando() {
        return connecting(URL, USER, PASSWORD);
    }

    private Boolean connecting(String URL, String USER, String PASSWORD) {
        try {
            if (connection == null || connection.isClosed()) {
                connection = DriverManager.getConnection(URL, USER, PASSWORD);
            }
            return true;
        } catch (SQLException e) {
            System.out.println("Connection failed: " + e.getMessage());
            return false;
        }
    }

    public String select(String table) {
        String sql = "SELECT * FROM " + table;
    	String lista = "";
        if (comprobando()) {
            try (Statement statement = connection.createStatement();
                 ResultSet resultSet = statement.executeQuery(sql)) {
                while (resultSet.next()) {
                    int id = resultSet.getInt("id");
                    String nombre = resultSet.getString("nombre");
                   lista += "ID: " + id + ", Nombre: " + nombre+"\n";
                }
            } catch (SQLException e) {
                lista = "hubo un error";
            }
        }
        return lista;
    }

    public void insertUser(String nombre) {
        String sql = "INSERT INTO usuarios (nombre) VALUE (?)";
        if (comprobando()) {
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setString(1, nombre);
                int rowsInserted = statement.executeUpdate();
                if (rowsInserted > 0) {
                    System.out.println("¡Inserción exitosa!");
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
    public void modificarUser(int id, String nombre) {
        String sql = "UPDATE usuarios SET nombre = ? WHERE id = ?";
        if (comprobando()) {
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
            	statement.setInt(2, id);
                statement.setString(1, nombre);
                int rowsInserted = statement.executeUpdate();
                if (rowsInserted > 0) {
                    System.out.println("¡Inserción exitosa!");
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    public String close() {
        if (connection != null) {
            try {
                connection.close();
                String r = "Connection closed";
                return r;
            } catch (SQLException e) {
                String r = "Failed to close connection: " + e.getMessage();
                return r;
            }
        } else {
        	return null; 
        }
    }
}