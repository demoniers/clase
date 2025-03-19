import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home/Home';
import Concesionario from './routes/concesionario/Concesionario';
import Singin from './routes/Users/singin';
import Login from './routes/Users/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/concesionario" element={<Concesionario />} />
      <Route path="/singin" element={<Singin />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
