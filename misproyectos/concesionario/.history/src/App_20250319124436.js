import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home/Home';
import Concesionario from './routes/concesionario/Concesionario';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/concesionario" element={<Concesionario />} />
      <Route path="/login" element={<login />} />
    </Routes>
  );
}

export default App;
