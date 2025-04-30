import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Form from './routes/Form';

const App = () => {
   return (
       <Router>
           <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/form" element={<Form />} />
           </Routes>
       </Router>
   );
};

export default App;
