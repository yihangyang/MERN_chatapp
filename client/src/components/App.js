import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './pages/about'
import Login from './pages/login'
import Register from './pages/register';

function App() {
  return (
    <div>
      <Switch>
        {/* <Route path="/" component={Home} /> */}
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
