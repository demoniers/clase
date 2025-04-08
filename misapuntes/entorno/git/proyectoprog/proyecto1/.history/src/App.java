public class App {
    public static void main(String[] args) throws Exception {
		int n1 = 5;
		int n2 = 10;
		int op = n1+n2;
		int num_ele = args.length;
		
		if (num_ele > 0) {
		    System.out.printf("La lista tiene %d elementos.%n",num_ele);
		    for (int i = 0; i < num_ele; i++) {
    		    System.out.printf("%s ",args[i]);
		    }
		} else {
		    System.out.printf("La lista esta vacia");
		}
		

    }
}
