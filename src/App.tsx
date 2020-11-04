import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import { LogIn } from './components/LogIn';
import { Notifications } from './components/Notifications';
import { Search } from './components/Search';
import { SignUp } from './components/SignUp';
import { Test } from './components/TEST';

export const App = () => {
  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/home">Home </Link>
          <Link to="/search">Search </Link>
          <Link to="/notifications">Notifications </Link>
        </nav>
        <Switch>
          <Route exact path="/">
            <SignUp />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/notifications">
            <Notifications />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
