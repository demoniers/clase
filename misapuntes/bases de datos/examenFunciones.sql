-- NOMBRE: 

# Examen sobre funciones SQL
use sakila;

-- FUNCIONES ARITMÉTICAS
/*
AVG() Calcula la media aritmética 
MAX() Devuelve el valor mayor 
MIN() Devuelve el valor menor 
SUM() Devuelve la suma
COUNT() Cuenta
*/

-- FUNCIONES DE CADENAS DE CARACTERES
/*
LOWER(c): Devuelve la cadena “c” con todas las letras convertidas a minúsculas.
UPPER(c): Devuelve la cadena “c” con todas las letras convertidas a mayúsculas.
LTRIM(c): Elimina los espacios por la izquierda de la cadena “c”.
RTRIM(c): Elimina los espacios por la derecha de la cadena “c”.
REPLACE(c, b, s): Sustituye en la cadena “c” el valor buscado “b” por el valor indicado en “s”.
REPLICATE(c, n): Devuelve el valor de la cadena “c” el número de veces “n” indicado.
CONCAT(str1,str2,...): Devuelve la cadena que resulta de concatenar los argumentos.
LEFT(c, n): Devuelve “n” caracteres por la izquierda de la cadena “c”.
RIGHT(c, n): Devuelve “n” caracteres por la derecha de la cadena “c”.
SUBSTRING(c, m, n): Devuelve una sub-cadena obtenida de la cadena “c”, a partir de la posición “m” y tomando “n” caracteres.
LENGTH(c): Tamaño de la cadena de caracteres.
*/

-- FUNCIONES DE FECHAS
/*
ADDDATE(date, INTERVAL expr unit), ADDDATE(expr,days), DATE_ADD(date, INTERVAL value unit): añade expr a una fecha   
CURRENT_DATE() / CURRENT_TIME () / CURTIME () /CURRENT_TIMESTAMP() / NOW(): Nos da la fecha / hora actual / fecha y hora actual 
DATE(fecha): Selecciona la fecha del parámetro (desechando la hora:minutos:segundos) 
DATEDIFF (fecha, fecha): Devuelve el número de días entre esas dos fechas. 
DATE_SUB (fecha, INTERVAL exprunit): Resta expr a una fecha
DAYNAME(fecha), DAYOFMONTH(fecha), DAYOFWEEK(fecha), DAYOFYEAR(fecha) 
SYSDATE(): La fecha y hora del sistema. 
TIMEDIFF('hh:mm:ss', 'hh:mm:ss'): Devuelve la diferencia entre dos horas 
DATEFORMAT (date, format): dar formato a una fecha.
*/

-- FUNCIONES DE CONVERSIÓN
/*
CONVERT(input_value, data_type):  convertir valores de un tipo de datos otro tipo de datos diferente
*/



-- 1- Saca el tiempo de duración media de todas las películas
SELECT AVG(length) AS "duracion media" FROM `film` WHERE 1;


-- 2- Haz un listado de las veces que se repite el nombre de los actores en la tabla actor, junto con su longitud y ordénalo de manera ascendente 
SELECT first_name, COUNT(first_name) FROM actor GROUP BY first_name;

-- 3- Sacar un listado con el nombre completo y la antigüedad de cada cliente. 
SELECT CONCAT(first_name, " ", last_name) as "Nombre", DATEDIFF (CURRENT_DATE(), create_date) AS "Antiguedada" FROM `customer` WHERE 1;

-- 4- En la tabla payment, se muestran los pagos realizados por cada cliente y qué empleado lo ha cobrado. 
-- Sacar un listado de lo que ha facturado cada empleado: mostrar el staff_id y el total facturado (amount).
SELECT staff_id, SUM(amount) FROM `payment` GROUP BY staff_id;

-- 5- Sacar la misma información que antes pero añadiendo nombre y apellidos del empleado.
SELECT CONCAT(staff.first_name, " ", staff.last_name) AS "Nombre", payment.staff_id, SUM(amount) FROM payment INNER JOIN staff ON payment.staff_id = staff.staff_id GROUP BY payment.staff_id;


-- 6 - ¿Cuántos distritos hay? Se mostrará el distrito y la cuenta de ese distrito ordenado de más a menos distritos. 
-- Solo se mostrarán aquellos que tengan más de un distrito.  
     -- Un ejemplo de salida sería:
		-- Abu Dhabi 3 
        -- Aceh 2
SELECT country.country, COUNT(city.city_id) AS "N distritos" FROM `country` INNER JOIN city ON country.country_id = city.country_id GROUP BY country.country;


-- 7 - Sacar el número de clientes que tiene cada tienda de esta forma: store_id, número clientes
SELECT store.store_id, COUNT(customer.customer_id) FROM `customer` INNER JOIN store ON customer.store_id = store.store_id GROUP BY store.store_id;


-- 8 - Listar cada película y el número de actores que aparecen en cada película ordenados de más a menos. 
-- Debe aparecer el título en minúscula y el número de actores
SELECT LOWER(film.title), COUNT(film_actor.actor_id) FROM `film_actor` INNER JOIN film ON film_actor.film_id = film.film_id GROUP BY film_actor.film_id ORDER BY COUNT(film_actor.actor_id) DESC;


-- 9 - Sacar una lista con la cantidad de películas que ha hecho cada actor(nombres y apellidos) y ordenar por el nombre y apellidos del actor.
SELECT CONCAT(actor.first_name, ' ', actor.last_name) AS actor_info, COUNT(film_actor.film_id) AS film_count FROM film_actor INNER JOIN actor ON film_actor.actor_id = actor.actor_id GROUP BY actor.actor_id ORDER BY CONCAT(actor.first_name, actor.last_name);

-- 10 - Usar JOIN para mostrar la cantidad recaudada (payment) de cada miembro de la empresa en agosto de 2005
-- Mostar: nombre, apellidos y la cantidad recaudada

SELECT CONCAT(staff.first_name, " ", staff.last_name) AS "Nombre", payment.staff_id, SUM(amount) FROM payment INNER JOIN staff ON payment.staff_id = staff.staff_id WHERE payment.payment_date LIKE "2005-08-%" GROUP BY payment.staff_id;



