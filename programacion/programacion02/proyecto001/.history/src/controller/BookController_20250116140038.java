
package controller;

import java.util.List;
import model.IModel;
import model.*;
import model.entidades.Book;
import model.repository.*;
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
}
