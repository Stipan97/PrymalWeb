import React, { ChangeEvent, useEffect, useState } from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../configs/firebase';
import { User } from '../models/User';
import { Follow } from './Follow';

export const Search: FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    db.collection('users')
      .where('searchName', '>=', event.currentTarget.value)
      .limit(10)
      .get()
      .then((query) => {
        setUsers([]);
        query.forEach((doc) => {
          setUsers((oldArray) => [...oldArray, doc.data() as User]);
        });
      });
  };

  useEffect(() => {
    db.collection('users')
      .limit(10)
      .get()
      .then((query) => {
        setUsers([]);
        query.forEach((doc) => {
          setUsers((oldArray) => [...oldArray, doc.data() as User]);
        });
      });
  }, []);

  return (
    <div>
      <input onChange={onChangeSearch} type="text" />
      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/profile/${user.id}`}>
            {user.firstName} {user.lastName} - {user.petName}
          </Link>
          <Follow id={user.id} />
        </div>
      ))}
    </div>
  );
};
