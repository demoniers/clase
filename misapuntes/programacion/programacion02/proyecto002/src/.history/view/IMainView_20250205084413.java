package view;

public interface IMainView {

	int mainMenu();
	void exit();
	void añadir();
	void eliminar();
	void editar();
	Car buscar();
	List<Car> listar();

}
