import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './redux/reducers';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Crear el store de Redux con los reducers y el middleware thunk
const store = createStore(reducers, applyMiddleware(thunk));

// Crear el root de React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizar la aplicación envuelta en el Provider de Redux
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Configuración opcional para medir el rendimiento de la aplicación
reportWebVitals();
