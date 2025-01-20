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
}