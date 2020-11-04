import React from 'react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../configs/firebase';
import { RootReducerState } from '../models/RootReducer';

interface FollowProps {
  id: string;
}

export const Follow: FC<FollowProps> = ({ id }) => {
  const currentUser = useSelector((state: RootReducerState) => state.user.data);

  const onClickFollow = () => {
    db.collection('follows').add({
      fromUserFollow: currentUser?.id,
      toUserFollow: id,
    });
  };

  return (
    <div>
      <button onClick={onClickFollow}>Follow</button>
    </div>
  );
};
