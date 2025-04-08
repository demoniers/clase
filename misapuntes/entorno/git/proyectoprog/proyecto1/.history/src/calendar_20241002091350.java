import java.util.Calendar;
import java.util.GregorianCalendar;

public class calendar {
    public static void main(String[] args) {
        // Crear una instancia de Calendar
        Calendar calendar = new GregorianCalendar();

        // Establecer una fecha específica (2 de octubre de 2024)
        int year = 2024;
        int month = Calendar.OCTOBER; // Los meses empiezan desde 0 (Enero) hasta 11 (Diciembre)
        int dayOfMonth = 2;
        calendar.set(year, month, dayOfMonth);

        // Obtener información de la fecha
        int currentYear = calendar.get(Calendar.YEAR);
        int currentMonth = calendar.get(Calendar.MONTH); // Recuerda que los meses empiezan desde 0
        int currentDay = calendar.get(Calendar.DAY_OF_MONTH);
        System.out.println("Fecha establecida: " + currentDay + "/" + (currentMonth + 1) + "/" + currentYear);

        // Añadir 5 días a la fecha actual
        calendar.add(Calendar.DAY_OF_MONTH, 5);
        int newYear = calendar.get(Calendar.YEAR);
        int newMonth = calendar.get(Calendar.MONTH);
        int newDay = calendar.get(Calendar.DAY_OF_MONTH);
        System.out.println("Nueva fecha (después de añadir 5 días): " + newDay + "/" + (newMonth + 1) + "/" + newYear);
    }
}

