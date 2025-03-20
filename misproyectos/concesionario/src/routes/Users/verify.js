async function verifySession() {
    const token = localStorage.getItem('token'); // Recuperar el token de localStorage
  
    if (!token) {
      console.error('No hay un token almacenado. Por favor, inicia sesión.');
      return;
    }
  
    try {
      const response = await fetch('/api/users/verify-session', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Agregar el token en el encabezado Authorization
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Sesión activa:', data);
      } else {
        console.error('Sesión no válida o expirada.');
      }
    } catch (error) {
      console.error('Error al verificar la sesión:', error);
    }
  }
  