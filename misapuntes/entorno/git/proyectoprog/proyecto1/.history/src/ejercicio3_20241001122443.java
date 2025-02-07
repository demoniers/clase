public class ejercicio3 {
	public static void main(String[] args) throws Exception {
        // Creación de un objeto Ordenador con los parámetros especificados en el constructor
		Ordenador ordenadorcasa = new Ordenador(/*"Intel core", "MSI", 16, "GTX 3090", 800 */);
	//	Ordenador PcSergio = new Ordenador("Intel segitox", "sergox", 2, "GTX", 80);
	//	Ordenador PcBase = new Ordenador("Intel core", "MSI", 16, "GTX 3090", 800);
		ordenadorcasa.cpuName = "intel";
//		System.out.print(ordenadorcasa.toString());
//		System.out.println("Ordenador [CPU=" + ordenadorcasa.cpuName + ", Motherboard=" + ordenadorcasa.motherboardName + ", RAM=" + ordenadorcasa.ramGB + "GB, Graphic Card=" + ordenadorcasa.graphiccardName + ", Power Supply=" + ordenadorcasa.poweSupplyWs + "W]");;

        // Imprimir los detalles del objeto Ordenador
    	System.out.println(ordenadorcasa);
    //	System.out.println(Imprimir(ordenadorcasa));
	}
	/*// funcion imprimir
	public static String Imprimir(Ordenador ordenador) {
		String lista = "Ordenador [CPU=" + ordenador.cpuName + ", Motherboard=" + ordenador.motherboardName + ", RAM=" + ordenador.ramGB + "GB, Graphic Card=" + ordenador.graphiccardName + ", Power Supply=" + ordenador.poweSupplyWs + "W]";
		return lista;
	}*/
}

class Ordenador {
	String cpuName;
	String motherboardName;
	int ramGB;
	String graphiccardName;
	int poweSupplyWs;


	// Constructor 
	// Inicialización de parametros de la clase
 /*	public Ordenador(String cpuName, String motherboardName, int ramGB, String graphiccardName, int poweSupplyWs) {
		this.cpuName = cpuName;
		this.motherboardName = motherboardName;
		this.ramGB = ramGB;
		this.graphiccardName = graphiccardName;
		this.poweSupplyWs = poweSupplyWs;
	}*/

    // Método toString
	// representar objeto Ordenador como cadena de texto
    public String toString() {
 	   String T = "Ordenador [CPU=" + cpuName + ", Motherboard=" + motherboardName + ", RAM=" + ramGB + "GB, Graphic Card=" + graphiccardName + ", Power Supply=" + poweSupplyWs + "W]";
		return T;
	}
}
