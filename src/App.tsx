import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import { LogIn } from './components/LogIn';
import { Notifications } from './components/Notifications';
import { SignUp } from './components/SignUp';

export const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <LogIn />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/notifications">
            <Notifications />
          </Route>
        </Switch>
      </Router>
      {/* <Navigation />
    <Post /> */}
    </div>
  );
};
