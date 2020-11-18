import React from 'react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootReducerState } from '../models/RootReducer';

export const Header: FC = () => {
  const currentUser = useSelector((state: RootReducerState) => state.user.data);

  return (
    <>
      {currentUser ? (
        <nav>
          <Link to="/home">Home </Link>
          <Link to="/search">Search </Link>
          <Link to="/notifications">Notifications </Link>
          <Link to={`profile/${currentUser?.id}`}>Profile</Link>
        </nav>
      ) : (
        <nav>
          <Link to="/">Signup </Link>
          <Link to="/login">Login </Link>
        </nav>
      )}
    </>
  );
};
