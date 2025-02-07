package model.entidades;

public class Alquiler {
    private int id;
    private String name;
    private Book book;

    public Alquiler(Book book, int id, String name) {
        this.book = book;
        this.id = id;
        this.name = name;
    }
    
}

