import React from 'react';
import { FC } from 'react';
import { db } from '../../configs/firebase';

interface LikeProps {
  notifId: string;
}

export const DeleteNotif: FC<LikeProps> = ({ notifId }) => {
  const onClickDelete = () => {
    db.collection('notifications').doc(notifId).delete();
  };

  return (
    <button className="btn-delete" onClick={onClickDelete}>
      Delete
    </button>
  );
};
