import React, { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { setCurrentUser } from '../../actions/currentUserActions';
import { auth, db } from '../../configs/firebase';
import { FirebaseAuthError } from '../../models/FirebaseAuthError';

export const SignUp: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [petName, setPetName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [emailChecker, setEmailChecker] = useState(false);
  const [passwordChecker, setPasswordChecker] = useState(false);
  const [repeatPasswordChecker, setRepeatPasswordChecker] = useState<boolean>();
  const [buttonChecker, setButtonChecker] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const onChangeFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.currentTarget.value);
  };
  const onChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.currentTarget.value);
  };
  const onChangePetName = (event: ChangeEvent<HTMLInputElement>) => {
    setPetName(event.currentTarget.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const onChangeRepeatPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(event.currentTarget.value);
  };

  const checkFirstName = (event: FocusEvent<HTMLInputElement>) => {
    if (firstName !== '') {
      event.target.className = 'no-border-input has-value';
    } else {
      event.target.className = 'no-border-input';
      setButtonChecker(false);
    }
  };
  const checkLastName = (event: FocusEvent<HTMLInputElement>) => {
    if (lastName !== '') {
      event.target.className = 'no-border-input has-value';
    } else {
      event.target.className = 'no-border-input';
      setButtonChecker(false);
    }
  };
  const checkPetName = (event: FocusEvent<HTMLInputElement>) => {
    if (petName !== '') {
      event.target.className = 'no-border-input has-value';
    } else {
      event.target.className = 'no-border-input';
      setButtonChecker(false);
    }
  };
  const checkEmail = (event: FocusEvent<HTMLInputElement>) => {
    if (email !== '') {
      event.target.className = 'no-border-input has-value';
      if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        setEmailChecker(true);
      } else {
        setEmailChecker(false);
      }
    } else {
      event.target.className = 'no-border-input';
      setButtonChecker(false);
    }
  };
  const checkPassword = (event: FocusEvent<HTMLInputElement>) => {
    if (password !== '') {
      event.target.className = 'no-border-input has-value';
      if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
        setPasswordChecker(true);
      } else {
        setPasswordChecker(false);
      }
    } else {
      event.target.className = 'no-border-input';
      setButtonChecker(false);
    }
  };
  const checkRepeatPassword = (event: FocusEvent<HTMLInputElement>) => {
    if (repeatPassword !== '') {
      event.target.className = 'no-border-input has-value';
      if (password === repeatPassword) {
        setRepeatPasswordChecker(false);
      } else {
        setRepeatPasswordChecker(true);
      }
    } else {
      event.target.className = 'no-border-input';
      setButtonChecker(false);
    }
  };

  const onClickSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        db.collection('users')
          .doc(response.user?.uid)
          .set({
            id: response.user?.uid,
            firstName: firstName,
            lastName: lastName,
            petName: petName,
            searchName: firstName + ' ' + lastName + ' ' + petName,
            profileImageUser:
              'https://firebasestorage.googleapis.com/v0/b/prymalweb.appspot.com/o/holders%2FprofileHolder.png?alt=media&token=9ac5d86b-ce81-42b5-ad86-6dfab0b5fcb8',
            profileImagePet:
              'https://firebasestorage.googleapis.com/v0/b/prymalweb.appspot.com/o/holders%2FdogProfileHolder.png?alt=media&token=4bbaef77-c05b-4605-98eb-75bec06e01cb',
          });
        auth.signInWithEmailAndPassword(email, password).then(() => {
          dispatch(setCurrentUser());
          history.push('/home');
        });
      })
      .catch((e) => {
        let code = (e as FirebaseAuthError).code;
        if (code === 'auth/email-already-in-use') {
          setErrorMsg('User with this email already exists.');
        }
      });
  };

  useEffect(() => {
    if (
      !emailChecker &&
      firstName &&
      lastName &&
      petName &&
      !passwordChecker &&
      !repeatPasswordChecker
    ) {
      setButtonChecker(true);
    }
  }, [
    emailChecker,
    firstName,
    lastName,
    petName,
    passwordChecker,
    repeatPasswordChecker,
  ]);

  return (
    <div className="master-div">
      <div className="wrap-login">
        <div className="login-form">
          <span className="login-title">Signup</span>
          <div className="wrap-input">
            <input
              type="text"
              className="no-border-input"
              onChange={onChangeFirstName}
              onBlur={checkFirstName}
            />
            <span className="focus-input" data-placeholder="First Name"></span>
          </div>
          <div className="wrap-input">
            <input
              type="text"
              className="no-border-input"
              onChange={onChangeLastName}
              onBlur={checkLastName}
            />
            <span className="focus-input" data-placeholder="Last Name"></span>
          </div>
          <div className="wrap-input">
            <input
              type="text"
              className="no-border-input"
              onChange={onChangePetName}
              onBlur={checkPetName}
            />
            <span className="focus-input" data-placeholder="Pet Name"></span>
          </div>
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
          <div className="wrap-input">
            <input
              type="password"
              className="no-border-input"
              onChange={onChangeRepeatPassword}
              onBlur={checkRepeatPassword}
            />
            <span
              className="focus-input"
              data-placeholder="Password Repeat"
            ></span>
          </div>
          <div className="container-error-message text-center">
            {emailChecker ? <span> E-mail is not valid.</span> : <span></span>}
            {passwordChecker ? (
              <span> Password is not valid.</span>
            ) : (
              <span></span>
            )}
            {repeatPasswordChecker ? (
              <span> Password do not match.</span>
            ) : (
              <span></span>
            )}
            {errorMsg}
          </div>
          <div className="container-login-btn">
            {buttonChecker ? (
              <button className="login-btn" onClick={onClickSignUp}>
                Signup
              </button>
            ) : (
              <button className="login-btn" onClick={onClickSignUp} disabled>
                Signup
              </button>
            )}
          </div>
          <div className="footer text-center">
            <Link to="/login">Already have account? Click here.</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
