import java.util.Calendar;
import java.util.GregorianCalendar;

public class calendar {
    public static void main(String[] args) {
        // Crear una instancia de Calendar para el mes actual
        Calendar calendar = new GregorianCalendar();
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH);
        int date = calendar.get(Calendar.DAY_OF_MONTH); // N de dia

        // Establecer el calendario al primer día del mes
        calendar.set(year, month, 1);

        // Obtener el día de la semana del primer día del mes
        int firstDayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);

        // Obtener el número de días en el mes
        int daysInMonth = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);

        // Imprimir el encabezado del calendario
        System.out.println("Lun Mar Mie Jue Vie Sab Dom");

        // Imprimir espacios en blanco para los días antes del primer día del mes
        for (int i = Calendar.MONDAY; i < firstDayOfWeek; i++) {
            System.out.print("    ");
        }

        // Imprimir los días del mes
        for (int day = 1; day <= daysInMonth; day++) {
            if (day == date) {
                System.out.print(fromat:"%3d", E)
            } else {
                System.out.printf("%3d ", day);
            }

            // Salto de línea al final de la semana
            if ((day + firstDayOfWeek - 1) % 7 == 0) {
                System.out.println();
            }
        }
    }
}
