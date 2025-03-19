import React from 'react';
import { useSelector } from 'react-redux';

const About = () => {
  const users = useSelector((state) => state.user.users);

  return (
    <div>
      <h1>Acerca de Nosotros</h1>
      <h2>Tenemos {users.length} usuarios registrados.</h2>
    </div>
  );
};

export default About;
