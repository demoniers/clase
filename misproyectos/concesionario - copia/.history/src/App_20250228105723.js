import logo from './logo.svg';
import './App.css';

import { Route, Switch } from 'react-router-dom';
//import Home from './Home';
import Concesionario from './Concesionario';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/concesionario" component={Concesionario} />
    </Switch>
  );
}
/*{
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

export default App;
