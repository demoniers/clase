import React from 'react';
import { useSelector } from 'react-redux';
import './Home.css';

const Home = () => {
  const users = useSelector((state) => state.user.users);

  return (
    <div>
      <h1>Bienvenido a la Página Principal</h1>
      <h2>Usuarios Registrados:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
