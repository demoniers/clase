package model.repository;

import java.util.List;
import model.IModel;
import model.entidades.Book;

public class ModelDatabase implements IModel {

	@Override
	public List<Book> list() {
		return null;
	}

	@Override
	public Book add(String isbn, String title) {
		return null;
	}
	@Override
	public Book search(int id) {
		return null;
	}
	@Override
    public void modify(int id, Book book, String isbn, String title) {}
	@Override
    public List<Book> delete(int id) {
		return null;
	}
}