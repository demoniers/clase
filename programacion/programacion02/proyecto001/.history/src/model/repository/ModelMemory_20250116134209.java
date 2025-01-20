package model.repository;

import java.util.ArrayList;
import java.util.List;
import model.IModel;
import model.entidades.Book;;

public class ModelMemory implements IModel {
	private int idCounter;
	List<Book> bookList;
	
	public ModelMemory() {
		idCounter = 1;
		bookList = new ArrayList<>();
	}

	@Override
	public List<Book> list() {
		return bookList;
	}

	@Override
	public Book add(String isbn, String title) {
		Book book = new Book();
		book.setId(idCounter);
		book.setIsbn(isbn);
		book.setName(title);
		bookList.add(book);
		idCounter++;
		return book;
	}
}