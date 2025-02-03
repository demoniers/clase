package view;

import javax.smartcardio.TerminalFactory;
import utils.TerminalUtils;

public class MainTerminalView
	implements IMainView {

	@Override
	public void hello() {
		TerminalUtils.output("  Bienvenido a AutoMotors \n ############################### \n seleccione la opcion a realizar \n ############################### ");
		TerminalUtils.output("1. Ver vehiculos en stock \n 2. Añadir vehiculo \n 3. Editar ficha de vehiculo \n 4. Eliminar vehiculo \n 0. Salir");
	}

}
