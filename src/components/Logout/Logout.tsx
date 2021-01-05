import React, { useEffect } from 'react';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setCurrentUserLogout } from '../../actions/currentUserActions';
import { RootReducerState } from '../../models/RootReducer';

export const Logout: FC = () => {
  const currentUser = useSelector((state: RootReducerState) => state.user.data);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      dispatch(setCurrentUserLogout());
      history.push('/');
    }
  }, []);

  return <div>You are now logged out.</div>;
};
