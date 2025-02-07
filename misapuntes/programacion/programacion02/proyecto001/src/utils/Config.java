package utils;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

// Clase que contiene la configuración del programa.
// Usa el patrón singleton
public class Config {
	private String modelType;
		
	public Config() {
		super();
	}

	public String getModelType() {
		return modelType;
	}

	public void setModelType(String modelType) {
		this.modelType = modelType;
	}

	// Singleton pattern
	private static String configPath = "C:\\Users\\alumnofp\\Desktop\\clase\\programacion\\programacion02\\proyecto001\\src\\config\\book.config";
	private static Config config;
	
	public static Config instance() {
		if(config == null) {
			config = Config.loadConfig();
		}
		return config;
	}
	
	private static Map<String, String> fileToMap(String configPath) {
		Map<String, String> config = new HashMap<String, String>();
		try {
			Scanner scanner = new Scanner(new File(configPath));
            
            while(scanner.hasNextLine()){
                String line = scanner.nextLine();
                String[] args = line.split("=");
                config.put(args[0], args[1]);
            }
            
			scanner.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			if(!config.containsKey("model_type")) {
	            config.put("model_type", "memory");
			}
		}
		return config;
	}
	
	private static Config loadConfig() {
		
		Map<String, String> map = fileToMap(configPath);
		
		Config config = new Config();
		
		// esto para los que sabemos que son obligatorios, si no existen se laza excepcion de no existir
		config.setModelType(map.get("model_type"));
		
		return config;
	}
}
