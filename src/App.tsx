import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SignUp } from './components/SignUp';

export const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <SignUp />
          </Route>
        </Switch>
      </Router>
      {/* <Navigation />
    <Post /> */}
    </div>
  );
};
