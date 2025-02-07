package model;

import java.util.List;
import model.entidades.Book;

public interface IModel {
    List<Book> list();
    Book add(String isbn, String title);
	Book search(int id);
    void modify(int id, Book book, String isbn, String title);
    List<Book> delete(int id);
}
