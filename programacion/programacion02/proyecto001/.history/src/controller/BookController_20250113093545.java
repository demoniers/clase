
package controller;

import java.util.List;
import model.entidades.Book;
import model.IModel;
import model.repository.ModelDatabase;
import model.repository.ModelMemory;
import utils.Config;


public class BookController {
    
	private Config config = Config.instance();
	private IModel model = new IModel() {};

	public BookController() {
		switch (config.getModelType()) {
			case "memory":
				model = new ModelMemory();
				break;
			case "database":
				model = new ModelDatabase();
				break;
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
