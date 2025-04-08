package view;

import utils.TerminalUtils;

public class MainTerminalView
	implements IMainView {

	@Override
	public void hello() {
		TerminalUtils.output("Hola mundo!");
	}

}
