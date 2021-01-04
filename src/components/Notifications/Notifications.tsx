import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { auth, db } from '../../configs/firebase';
import { Notification } from '../../models/Notification';
import { User } from '../../models/User';
import { DeleteNotif } from './DeleteNotif';
import './Notifications.css';

export const Notifications: FC = () => {
  let notifFromId: string[] = [];
  const [users, setUsers] = useState<User[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const unsubscribe = db
      .collection('notifications')
      .where('toUserId', '==', auth.currentUser?.uid)
      .limit(10)
      .orderBy('notifTime', 'desc')
      .onSnapshot(
        {
          includeMetadataChanges: true,
        },
        (query) => {
          setNotifications([]);
          notifFromId = [];
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
    <div className="notif-container">
      {notifications.map((notification) => (
        <div className="notif-item-container" key={notification.id}>
          <div>
            <h1 className="user-name">
              {users.find((obj) => {
                return obj.id === notification.fromUserId;
              })?.firstName +
                ' ' +
                users.find((obj) => {
                  return obj.id === notification.fromUserId;
                })?.lastName}
            </h1>
            <p className="description">{notification.type}</p>
          </div>
          <DeleteNotif notifId={notification.id} />
        </div>
      ))}
    </div>
  );
};
