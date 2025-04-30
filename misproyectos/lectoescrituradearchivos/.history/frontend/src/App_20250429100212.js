import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Form from './routes/Form';
import GraficosChat from './routes/graficosChat';

const App = () => {
   return (
       <Router>
           <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/form" element={<Form />} />
               <Route path="/graph" element={<GraficosChat />} />
           </Routes>
       </Router>
   );
};

export default App;
