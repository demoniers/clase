package view;

public interface IMainView {

	int mainMenu();
	void exit();
	void añadir();
	void eliminar();
	void editar();
	void buscar();
	void listar(List<Car> list);

}
