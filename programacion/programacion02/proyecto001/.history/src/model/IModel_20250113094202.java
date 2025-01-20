package model;

import java.util.List;
import model.entidades.Book;

public interface IModel {
	List<Book> list();
	Book add(String isbn, String title);
}