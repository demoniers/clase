package view;

import controller.BookController;
import java.util.List;
import model.entidades.Book;
import utils.TerminalUtils;

public class MainView {
    private BookController bookController;

    public void RunRutin() {
        int option;
        String optioncadena;


       do {
            TerminalUtils.imprime("Menu de libreria");
            TerminalUtils.imprime("================");
            TerminalUtils.imprime("1. Listar Libros \n 2. Crear libro \n 3. Modificar libro \n 4. Eliminar libro \n 0. Salir");
            optioncadena = TerminalUtils.introduce();
            try {
                option = Integer.parseInt(optioncadena);                
            } catch (NumberFormatException e) {
                TerminalUtils.imprime("Error no se introdujo un valor valido");
                option = -1;
            }
            switch  (option) {
                case 1 -> {
                    // Listar libros
                    TerminalUtils.imprime("Lista de libros");
                    List<Book> books = bookController.list();
                    TerminalUtils.imprime(Book.toTerminalTableHeader());
                    for(Book book : books) {
                        TerminalUtils.imprime(book.toTerminalTable());
                    }
                }
               case 2 -> {
                   TerminalUtils.imprime("Añadir libro");
                   TerminalUtils.imprime("Introduce titulo");
                   String title = TerminalUtils.introduce();
                   TerminalUtils.imprime("Introduce isbn");
                   String isbn = TerminalUtils.introduce();
                   Book book = bookController.add(isbn, title);
                   TerminalUtils.imprime("Valida que los datos esten bien");
                   TerminalUtils.imprime(book.toTerminalCreation());
                   TerminalUtils.imprime("Si los datos estan incorrectos entra en la opcion 3");
                }
                case 3 -> {
                    TerminalUtils.imprime("Intoduce ID del libro a buscar:");
                    String ids = TerminalUtils.introduce();
                    int id = Integer.parseInt(ids);
                    Book book = bookController.search(id);
                    if (book != null) {
                        // AÑADIR IF PARA CONTROLAR LA LISTA DE LIBROS
                        TerminalUtils.imprime("Titulo: "+book.getName()+" ISBN: "+book.getISBN());
                        TerminalUtils.imprime("Nuevo Titulo: ");
                        String title = TerminalUtils.introduce();
                        TerminalUtils.imprime("Nuevo Isbn: ");
                        String isbn = TerminalUtils.introduce();
                        bookController.modify(id, isbn, title);
                        Book newbook = bookController.viewnew(id);
                        TerminalUtils.imprime("Titulo: "+newbook.getName()+" ISBN: "+newbook.getISBN());
                    } else {
                        TerminalUtils.imprime("No se encontro el libro con el id "+id+" observe la lista y vuelva a intertarlo.");
                    }
                }
                case 4 -> {
                    TerminalUtils.imprime("Intoduce ID del libro a buscar:");
                    String ids = TerminalUtils.introduce();
                    int id = Integer.parseInt(ids);
                    Book book = bookController.search(id);
                    if (book != null) {
                        TerminalUtils.imprime("Titulo: "+book.getName()+" ISBN: "+book.getISBN());
                        TerminalUtils.imprime("Deseas elimar? (s/n)");
                        String son = TerminalUtils.introduce();
                        if (son.equals("s")) {
                            bookController.delete(id, book);
                        }
                    } else {
                        TerminalUtils.imprime("No se encontro el libro con el id "+id+" observe la lista y vuelva a intertarlo.");
                    }
                }
            }
        }  while (option != 0);
        TerminalUtils.imprime("Programa finalizado");
    }
    public MainView () {
        bookController = new BookController();
    }
}
