import React, { ChangeEvent, useEffect, useState } from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../configs/firebase';
import { User } from '../../models/User';
import { Follow } from './Follow';
import './Search.css';

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
    <div className="search-container">
      <div className="input-container">
        <input onChange={onChangeSearch} type="text" placeholder="Search" />
      </div>
      <div className="results-container">
        {users.map((user) => (
          <div className="search-result" key={user.id}>
            <Link className="search-name" to={`/profile/${user.id}`}>
              {user.firstName} {user.lastName} - {user.petName}
            </Link>
            <Follow id={user.id} />
          </div>
        ))}
      </div>
    </div>
  );
};
