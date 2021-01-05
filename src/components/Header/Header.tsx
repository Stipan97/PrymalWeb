import React from 'react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootReducerState } from '../../models/RootReducer';
import './Header.css';

export const Header: FC = () => {
  const currentUser = useSelector((state: RootReducerState) => state.user.data);

  return (
    <>
      {currentUser ? (
        <nav className="navbar">
          <div className="navbar-items">
            <Link className="navbar-item" to="/home">
              Home
            </Link>
            <Link className="navbar-item" to="/search">
              Search
            </Link>
            <Link className="navbar-item" to="/notifications">
              Notifications
            </Link>
            <Link className="navbar-item" to={`profile/${currentUser?.id}`}>
              Profile
            </Link>
            <Link className="navbar-item" to="/uploadPost">
              Upload Post
            </Link>
            <Link className="navbar-item" to="/logout">
              Logout
            </Link>
          </div>
        </nav>
      ) : (
        <nav className="navbar">
          <div className="navbar-items">
            <Link className="navbar-item" to="/">
              Signup
            </Link>
            <Link className="navbar-item" to="/login">
              Login
            </Link>
          </div>
        </nav>
      )}
    </>
  );
};
