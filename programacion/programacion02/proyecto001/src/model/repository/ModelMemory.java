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
		if (bookList == null) {
			System.out.println("Lista nula");
		} 
		return bookList;
	}

	@Override
	public Book add(String isbn, String title) {
		Book book = new Book();
		if (idCounter > bookList.size()+1) {
			idCounter = bookList.size()+1;
		}
		book.setId(idCounter);
		book.setIsbn(isbn);
		book.setName(title);
		bookList.add(book);
		idCounter++;
		return book;
	}
	@Override
	public Book search(int id) {
		Book book = bookList.get(id);
		if (book != null) {
			return book;
		} else {
			return null;
		}
	}
	@Override	
    public void modify(int id, Book book, String isbn, String title) {
		book.setIsbn(isbn);
		book.setName(title);
		bookList.set(id, book);
	}
	@Override
	public List<Book> delete(int id) {
		Book bookToDelete = null;
		for (Book book : bookList) {
			if (book.getId() == id) {
				bookToDelete = book;
				break;
			}
		}
		if (bookToDelete != null) {
			bookList.remove(bookToDelete);
			int element = 1;
			for (Book book : bookList) {
				book.setId(element);
				element++;
			}
		}
		return  bookList;
	}
}