import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../configs/firebase';
import { RootReducerState } from '../models/RootReducer';

interface FollowProps {
  id: string;
}

export const Follow: FC<FollowProps> = ({ id }) => {
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

  useEffect(() => {
    if (currentUser) {
      db.collection('follows')
        .where('fromUserFollow', '==', currentUser.id)
        .where('toUserFollow', '==', id)
        .get()
        .then((query) => {
          query.forEach(() => {
            setButtonState(true);
          });
        });
    }
  }, [currentUser]);

  return (
    <div>
      {currentUser?.id === id ? (
        <></>
      ) : buttonState ? (
        <div>
          <button onClick={onClickUnfollow}>Unfollow</button>
        </div>
      ) : (
        <div>
          <button onClick={onClickFollow}>Follow</button>
        </div>
      )}
    </div>
  );
};
