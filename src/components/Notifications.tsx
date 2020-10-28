import React, { useEffect } from 'react';
import { FC } from 'react';
import { auth, db } from '../configs/firebase';

export const Notifications: FC = () => {
  useEffect(() => {
    const unsubscribe = db
      .collection('notifications')
      .where('toUserId', '==', auth.currentUser?.uid)
      .onSnapshot(
        {
          includeMetadataChanges: true,
        },
        (query) => {
          query.forEach((doc) => {
            console.log(doc.data());
          });
        },
      );

    return () => unsubscribe();
  }, []);

  return <div></div>;
};
