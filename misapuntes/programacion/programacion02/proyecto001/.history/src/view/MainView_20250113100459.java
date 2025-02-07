package view;

import utils.TerminalUtils;
import controller.BookController;
import model.entidades.Book;
import java.util.List;

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
					TerminalUtils.output(Book.toTerminalTableHeader());
                    for(Book book : books) {
                        TerminalUtils.imprime(book.toTerminalTable());
                    }
                    break;
               case 2:
                    TerminalUtils.imprime("introduce el titulo del libro");
                    String nombre = TerminalUtils.introduce();
                    TerminalUtils.imprime("introduce el ISBN del libro");
                    int isbn = Integer.parseInt(TerminalUtils.introduce());
                    TerminalUtils.CreateBook(nombre, isbn);
                    break;
            }
        }  while (option != 0);
        TerminalUtils.imprime("Programa finalizado");
    }
}
