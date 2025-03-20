import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home/Home';
import Concesionario from './routes/concesionario/Concesionario';
import Singin from './routes/Users/singin';
import Login from './routes/Users/Login';
import Logout from './routes/Users/Logout';
import AdminPanel from './routes/Admin/ControlPanel';
import VhAdminPanel from './routes/Admin/VehiclePanel';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/concesionario" element={<Concesionario />} />
      <Route path="/singin" element={<Singin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/admin/panel" element={<AdminPanel />} />
      <Route path="/admin/vhpanel" element={<VhAdminPanel />} />
    </Routes>
  );
}

export default App;
