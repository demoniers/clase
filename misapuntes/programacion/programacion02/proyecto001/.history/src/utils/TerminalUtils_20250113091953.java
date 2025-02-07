package utils;

import java.util.Scanner;

public class TerminalUtils {
	private static Scanner scanner = new Scanner(System.in);

	public static String introduce() {
		String result = scanner.nextLine();
		return result;
	}
	
	public static void imprime(String text) {
		System.out.println(text);
	}

	public static int introduceInt() {
		int result = Integer.parseInt(scanner.nextLine());
		return result;
	}
}