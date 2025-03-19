import React from 'react';
import { Route, Routes } from 'react-router-dom';
//import Home from './Home';
import Concesionario from './Concesionario';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/concesionario" element={<Concesionario />} />
    </Routes>
  );
}

export default App;
