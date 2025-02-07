package model.entidades;

public class Book {
    private int id;
    private String name;
    private String ISBN;

    public Book(String ISBN, int id, String name) {
        this.ISBN = ISBN;
        this.id = id;
        this.name = name;
    }

    @Override
    public String toString() {
        return "Libro: [id: " + id + ", name: " + name + ", ISBN: " + ISBN + "]";
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getISBN() {
        return ISBN;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setIsbn(int isbn) {
        this.ISBN = isbn;
    }



}
