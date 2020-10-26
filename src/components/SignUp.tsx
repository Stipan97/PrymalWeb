import React, { ChangeEvent, useEffect, useState } from 'react';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../configs/firebase';

export const SignUp: FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [petName, setPetName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [emailChecker, setEmailChecker] = useState(true);
  const [passwordChecker, setPasswordChecker] = useState(true);
  const [repeatPasswordChecker, setRepeatPasswordChecker] = useState<boolean>();
  const [buttonChecker, setButtonChecker] = useState(true);

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

  const checkEmail = () => {
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setEmailChecker(false);
    } else {
      setEmailChecker(true);
    }
  };
  const checkPassword = () => {
    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
      setPasswordChecker(false);
    } else {
      setPasswordChecker(true);
    }
  };
  const checkRepeatPassword = () => {
    if (password === repeatPassword) {
      setRepeatPasswordChecker(true);
    } else {
      setRepeatPasswordChecker(false);
    }
  };

  const onClickSignUp = () => {
    auth.createUserWithEmailAndPassword(email, password).then((response) => {
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
        //dispatch
        history.push('/home');
      });
    });
  };

  useEffect(() => {
    if (
      emailChecker &&
      firstName &&
      lastName &&
      petName &&
      passwordChecker &&
      repeatPasswordChecker
    ) {
      setButtonChecker(false);
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
    <div>
      <label>E-mail:</label>
      <input onChange={onChangeEmail} onBlur={checkEmail} type="text" />
      {!emailChecker && <p>That is not valid email.</p>}
      <label>First name:</label>
      <input onChange={onChangeFirstName} type="text" />
      <label>Last name:</label>
      <input onChange={onChangeLastName} type="text" />
      <label>Pet name:</label>
      <input onChange={onChangePetName} type="text" />
      <label>Password:</label>
      <input
        onChange={onChangePassword}
        onBlur={checkPassword}
        type="password"
      />
      {!passwordChecker && <p>That is not valid password.</p>}
      <label>Repeat password:</label>
      <input
        onChange={onChangeRepeatPassword}
        onBlur={checkRepeatPassword}
        type="password"
      />
      {!repeatPasswordChecker && <p>Password do not match.</p>}
      <button onClick={onClickSignUp} disabled={buttonChecker}>
        SignUp
      </button>
    </div>
  );
};
