import React, { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { setCurrentUser } from '../../actions/currentUserActions';
import { auth } from '../../configs/firebase';

export const LogIn: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonChecker, setButtonChecker] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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

  const checkEmail = (event: FocusEvent<HTMLInputElement>) => {
    if (email !== '') {
      event.target.className = 'no-border-input has-value';
    } else {
      event.target.className = 'no-border-input';
      setButtonChecker(false);
    }
  };

  const checkPassword = (event: FocusEvent<HTMLInputElement>) => {
    if (password !== '') {
      event.target.className = 'no-border-input has-value';
    } else {
      event.target.className = 'no-border-input';
      setButtonChecker(false);
    }
  };

  useEffect(() => {
    if (email && password) {
      setButtonChecker(true);
    }
  }, [email, password]);

  return (
    <div className="master-div">
      <div className="wrap-login">
        <div className="login-form">
          <span className="login-title">Login</span>
          <div className="wrap-input">
            <input
              type="text"
              className="no-border-input"
              onChange={onChangeEmail}
              onBlur={checkEmail}
            />
            <span className="focus-input" data-placeholder="Email"></span>
          </div>
          <div className="wrap-input">
            <input
              type="password"
              className="no-border-input"
              onChange={onChangePassword}
              onBlur={checkPassword}
            />
            <span className="focus-input" data-placeholder="Password"></span>
          </div>
          <div className="container-error-message">
            <span>{errorMsg}</span>
          </div>
          <div className="container-login-btn">
            {buttonChecker ? (
              <button className="login-btn" onClick={onClickLogIn}>
                Login
              </button>
            ) : (
              <button className="login-btn" onClick={onClickLogIn} disabled>
                Login
              </button>
            )}
          </div>
          <div className="footer text-center">
            <Link to="/">Don't have account?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
