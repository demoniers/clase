import React, { useState } from 'react';
import { auth } from '../firebaseConfig';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      alert('Usuario registrado con éxito');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo Electrónico"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Signup;
