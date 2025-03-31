import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home/Home';
import Concesionario from './routes/concesionario/Concesionario';
import Singin from './routes/Users/singin';
import Login from './routes/Users/Login';
import Logout from './routes/Users/Logout';
import AdminPanel from './routes/Admin/ControlPanel';
import VhAdminPanel from './routes/Admin/VehiclePanel';
import GestionClientes from './routes/Admin/GestionClientes';
import verAlquiler from './routes/Admin/ViewRents';
import RentalPanel from './routes/Customer/RentalPanel';
import Profile from './routes/Customer/ProfilePanel';
import MyRents from './routes/Customer/myRents';

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
      <Route path="/admin/gestionCliente" element={<GestionClientes />} />
      <Route path="/rentalPanel" element={<RentalPanel />} />
      <Route path="/profilePanel" element={<Profile />} />
      <Route path="/myrents" element={<MyRents />} />
    </Routes>
  );
}

export default App;
