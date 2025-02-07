package controller;
import java.util.ArrayList;
import java.util.List;
import model.entidades.Book;

public class BookController {
    private List<Book> listbook; 
    public BookController() { 
        listbook = new ArrayList<>();
    }

    public void AddBook(Book libro) {
        listbook.add(libro);
    }
    public List<Book> Lista() {
        return listbook;
    }
        
    public int getId() { 
        int id = listbook.size() + 1;
        return id;
    }
    
}
