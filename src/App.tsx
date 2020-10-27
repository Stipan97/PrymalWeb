import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LogIn } from './components/LogIn';
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
        </Switch>
      </Router>
      {/* <Navigation />
    <Post /> */}
    </div>
  );
};
