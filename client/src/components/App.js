import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './pages/about'

function App() {
  return (
    <div>
      <Switch>
        {/* <Route path="/" component={Home} /> */}
        <Route path="/about" component={About} />
      </Switch>
    </div>
  );
}

export default App;
