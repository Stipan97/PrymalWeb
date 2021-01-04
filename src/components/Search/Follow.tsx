import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../configs/firebase';
import { RootReducerState } from '../../models/RootReducer';

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

    let time = Date.now();
    const notifRef = db.collection('notifications').doc();
    notifRef.set({
      id: notifRef.id,
      fromUserId: currentUser?.id,
      toUserId: id,
      type: 'Started following you.',
      notifTime: time,
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
          <button className="btn-search" onClick={onClickUnfollow}>
            Unfollow
          </button>
        </div>
      ) : (
        <div>
          <button className="btn-search" onClick={onClickFollow}>
            Follow
          </button>
        </div>
      )}
    </div>
  );
};
