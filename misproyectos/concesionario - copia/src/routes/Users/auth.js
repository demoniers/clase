// auth.js

export function isLoggedIn() {
  const token = localStorage.getItem("token");
  // Comprueba si el token existe (puedes añadir validaciones adicionales si es necesario)
  return token ? true : false;
}
export const logout = async (navigate) => {
  try {
    // Llamar al endpoint del backend para informar el cierre de sesión
    const response = await fetch('http://10.0.0.124:5000/api/users/logout', {
      method: 'POST',
    });

    if (response.ok) {
      // Eliminar el token almacenado
      localStorage.removeItem('token');

      // Redirigir al usuario a la página de inicio de sesión
      navigate('/login');
      alert('Sesión cerrada correctamente.');
    } else {
      alert('Error al cerrar sesión.');
    }
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    alert('Hubo un problema al cerrar la sesión.');
  }
};
