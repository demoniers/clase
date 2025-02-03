package com.project02.view;

import com.project02.utils.TerminalUtils;

public class MainTerminalView
	implements IMainView {

	@Override
	public void hello() {
		TerminalUtils.output("Hola mundo!");
	}

}
