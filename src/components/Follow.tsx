import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { db } from '../configs/firebase';
import { RootReducerState } from '../models/RootReducer';

interface FollowProps {
  id: string;
}

export const Follow: FC<FollowProps> = ({ id }) => {
  const history = useHistory();
  const currentUser = useSelector((state: RootReducerState) => state.user.data);
  const [buttonState, setButtonState] = useState(false);

  const onClickFollow = () => {
    db.collection('follows').add({
      fromUserFollow: currentUser?.id,
      toUserFollow: id,
    });
    setButtonState(true);
  };

  const onClickUnfollow = () => {
    db.collection('follows')
      .where('fromUserFollow', '==', currentUser?.id)
      .where('toUserFollow', '==', id)
      .get()
      .then((query) => {
        query.forEach((doc) => {
          db.collection('follows').doc(doc.id).delete();
        });
        setButtonState(false);
      });
  };

  const onClickProfileCurrentUser = () => {
    history.push('/profile', { id: currentUser?.id });
  };

  const onClickProfile = () => {
    history.push('/profile', { id: id });
  };

  useEffect(() => {
    if (currentUser) {
      db.collection('follows')
        .where('fromUserFollow', '==', currentUser.id)
        .where('toUserFollow', '==', id)
        .get()
        .then((query) => {
          query.forEach((doc) => {
            setButtonState(true);
          });
        });
    }
  }, [currentUser]);

  return (
    <div>
      {currentUser?.id === id ? (
        <button onClick={onClickProfileCurrentUser}>Go to Profile</button>
      ) : buttonState ? (
        <div>
          <button onClick={onClickUnfollow}>Unfollow</button>
          <button onClick={onClickProfile}>Go to Profile</button>
        </div>
      ) : (
        <div>
          <button onClick={onClickFollow}>Follow</button>
          <button onClick={onClickProfile}>Go to Profile</button>
        </div>
      )}
    </div>
  );
};
