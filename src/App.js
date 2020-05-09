import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MainApp from './containers/MainApp';
import Checkout from './containers/Checkout';

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/" component={MainApp} />
          <Route path="/checkout" component={Checkout} />
      </Switch>
    </Router>
  );
}

export default App;
