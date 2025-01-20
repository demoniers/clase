package view;

import controller.BookController;
import java.util.List;
import model.entidades.Book;
import utils.TerminalUtils;

public class MainView {
    private BookController bookController;
    public void show() { // EXAMPLE
        System.out.println("MainView: Hellow World");
    }

    public void RunRutin() {
        int option;
        String optioncadena;
       do {
            TerminalUtils.imprime("Menu de libreria");
            TerminalUtils.imprime("================");
            TerminalUtils.imprime("1. Listar Libros \n 0. Salir");
            optioncadena = TerminalUtils.introduce();
            try {
                option = Integer.parseInt(optioncadena);                
            } catch (Exception e) {
                TerminalUtils.imprime("Error no se introdujo un valor valido");
                option = -1;
            }
            switch  (option) {
                case 1: // Listar libros
                    TerminalUtils.imprime("Lista de libros");
                    List<Book> books = bookController.list();
					TerminalUtils.imprime(Book.toTerminalTableHeader());
                    for(Book book : books) {
                        TerminalUtils.imprime(book.toTerminalTable());
                    }
                    break;
               case 2:
                    TerminalUtils.imprime("Añadir libro");
                    TerminalUtils.imprime("Introduce titulo");
                    String title = TerminalUtils.introduce();
                    TerminalUtils.imprime("Introduce isbn");
                    String isbn = TerminalUtils.introduce();
                    Book book = bookController.add(isbn, title);
                    TerminalUtils.imprime("Valida que los datos esten bien");
                    TerminalUtils.imprime(book.toTerminalCreation());
                    TerminalUtils.imprime("Si los datos estan incorrectos entra en la opcion 3");
                    break;
            }
        }  while (option != 0);
        TerminalUtils.imprime("Programa finalizado");
    }
}
