import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { auth, db } from '../configs/firebase';
import { Notification } from '../models/Notification';
import { User } from '../models/User';

export const Notifications: FC = () => {
  let notifFromId: string[] = [];
  const [users, setUsers] = useState<User[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const unsubscribe = db
      .collection('notifications')
      .where('toUserId', '==', auth.currentUser?.uid)
      .onSnapshot(
        {
          includeMetadataChanges: true,
        },
        (query) => {
          setNotifications([]);
          query.forEach((doc) => {
            setNotifications((oldArray) => [
              ...oldArray,
              doc.data() as Notification,
            ]);

            notifFromId.push((doc.data() as Notification).fromUserId);

            db.collection('users')
              .where('id', 'in', notifFromId)
              .get()
              .then((query) => {
                query.forEach((doc) => {
                  setUsers((oldArray) => [...oldArray, doc.data() as User]);
                });
              });
          });
        },
      );

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {notifications.map((notification) => (
        <div key={notification.id}>
          <h1>
            {
              users.find((obj) => {
                return obj.id === notification.fromUserId;
              })?.firstName
            }
          </h1>
          <p>{notification.type}</p>
        </div>
      ))}
    </div>
  );
};
