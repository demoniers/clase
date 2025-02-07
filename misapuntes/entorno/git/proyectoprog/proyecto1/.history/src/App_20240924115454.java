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
            
    /*	    if (args.length > 1) {
                System.out.printf("%d+%d=%d%n%s %s",n1,n2,op,args[0],args[1]);
            } else if (args.length > 0)  {
                System.out.printf("%d+%d=%d%n%s",n1,n2,op,args[0]);
            } else {
                System.out.printf("%d+%d=%d",n1,n2,op);
            }
                System.out.printf("%n hay %d argumentos",num_ele);
            int l1 = 6;
            for (int i = 0; i < 6; i++) {
                for (int c2 = 0; c2 < l1-1; c2++) {
                    System.out.printf(" ");
                }
                for (int c = 6; c > l1; c--) {
                    System.out.printf("+");
                }
                for (int c3 = 6; c3 > l1; c3--) {
                    System.out.printf("+");
                }
                System.out.printf("%n");
                l1--;
            }*/
        }
    }
}
