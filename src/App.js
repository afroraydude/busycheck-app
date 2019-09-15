import React from 'react';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Redirect, Switch } from "react-router-dom"
import Debug from "./views/Debug";
// import logo from './logo.svg';
import './App.css';
import Home from './views/Home';
import { Main } from './views/Main';
import { AreaView } from './views/AreaView';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/debug" component={Debug} />
        <Route exact path="/buildings" component={Main} />
        <Route exact path="/buildings/:building/:floor?" component={AreaView} />
        {/** insert 404 page */}
      </Switch>
    </Router>
  );
}

export default App;
