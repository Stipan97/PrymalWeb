import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { LogIn } from './components/LogIn';
import { Notifications } from './components/Notifications';
import { Profile } from './components/Profile';
import { Search } from './components/Search';
import { SignUp } from './components/SignUp';
import { Test } from './components/TEST';

export const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route path="/login" component={LogIn} />
          <Route path="/home" component={Home} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/search" component={Search} />
          <Route path="/profile/:userId" component={Profile} />
          <Route path="/test" component={Test} />
        </Switch>
      </Router>
    </div>
  );
};
