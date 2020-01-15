import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../Home';

import './App.css';

const App = () => {
  const [test, setTest] = useState(true);

  return (
    <Router>
      <main className="App">
        <Switch>
          <Route exact path="/" render={() => <Home test={test} />} />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
