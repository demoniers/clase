package controller;

import java.util.List;
import model.IModel;
import model.entidades.*;
import model.repository.*;
import utils.Config;


public class BookController {
	Config config = Config.instance();
	IModel model;

	public BookController() {
		switch(config.getModelType()) {
			case "memory" -> {
				model = new ModelMemory();
			}
			case "database" -> {
				model = new ModelDatabase();
			}
		}
	}
    
	public List<Book> list() {
		List<Book> list = model.list();
		return list;
	}
	
	public Book add(String isbn, String title) {
		Book book = model.add(isbn, title);
		return book;
	}
	public Book search(int id) {
		id = id-1;
		List<Book> list = model.list();
		if (id >= 0 && id < list.size()) {
			Book book = model.search(id);
			if (book != null) {
				return book;
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
	public void modify(int id, String isbn, String title) {
		id = id-1;
		Book book = model.search(id);
		model.modify(id, book, isbn, title);
	}// revisar
	public List<Book> delete(int id, Book book) {
		List<Book> newList = model.delete(id);
		return newList;
	}
	public Book viewnew(int id) {
		id = id-1;
		Book newbook = model.search(id);
		return newbook;
	}
	
}
