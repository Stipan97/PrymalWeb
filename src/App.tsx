import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import { LogIn } from './components/LogIn';
import { Notifications } from './components/Notifications';
import { Profile } from './components/Profile';
import { Search } from './components/Search';
import { SignUp } from './components/SignUp';
import { Test } from './components/TEST';
import { RootReducerState } from './models/RootReducer';

export const App = () => {
  const currentUser = useSelector((state: RootReducerState) => state.user.data);

  const routesWithNavigation = () => {
    return (
      <>
        <nav>
          <Link to="/home">Home </Link>
          <Link to="/search">Search </Link>
          <Link to="/notifications">Notifications </Link>
          <Link to={{ pathname: '/profile', state: { id: currentUser?.id } }}>
            Profile
          </Link>
        </nav>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/notifications">
            <Notifications />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </>
    );
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <SignUp />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/test">
            <Test />
          </Route>

          <Route component={routesWithNavigation} />
        </Switch>
      </Router>
    </div>
  );
};
