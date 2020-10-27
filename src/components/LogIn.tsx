import React, { ChangeEvent, useEffect, useState } from 'react';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { setCurrentUser } from '../actions/currentUserActions';
import { auth } from '../configs/firebase';

export const LogIn: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonChecker, setButtonChecker] = useState(true);

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const onClickLogIn = () => {
    auth.signInWithEmailAndPassword(email, password).then(() => {
      dispatch(setCurrentUser());
      history.push('/home');
    });
  };

  useEffect(() => {
    if (email && password) {
      setButtonChecker(false);
    }
  }, [email, password]);

  return (
    <div>
      <label>E-mail:</label>
      <input onChange={onChangeEmail} type="text" />
      <label>Password:</label>
      <input onChange={onChangePassword} type="password" />
      <button onClick={onClickLogIn} disabled={buttonChecker}>
        LogIn
      </button>
      <Link to="/">Don't have account?</Link>
    </div>
  );
};
