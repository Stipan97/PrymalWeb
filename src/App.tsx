import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Home } from './components/HomeFeed/Home';
import { LogIn } from './components/LoginRegisterForm/LogIn';
import { Notifications } from './components/Notifications/Notifications';
import { Profile } from './components/Profile/Profile';
import { Search } from './components/Search/Search';
import { SignUp } from './components/LoginRegisterForm/SignUp';
import { UploadPost } from './components/UploadImage/UploadPost';
import { Logout } from './components/Logout/Logout';
import './style/App.css';

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
          <Route path="/uploadPost" component={UploadPost} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </Router>
    </div>
  );
};
