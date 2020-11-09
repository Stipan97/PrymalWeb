import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../configs/firebase';
import { Post } from '../models/Post';
import { CurrentUserId, User } from '../models/User';

export const Profile: FC = () => {
  const location = useLocation();
  const userId = (location.state as CurrentUserId).id;
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    db.collection('users')
      .where('id', '==', userId)
      .get()
      .then((query) => {
        query.forEach((doc) => {
          setUser(doc.data() as User);
        });
      });

    setPosts([]);
    db.collection('posts')
      .where('userId', '==', userId)
      .limit(10)
      .orderBy('uploadTime', 'desc')
      .get()
      .then((query) => {
        query.forEach((doc) => {
          setPosts((oldArray) => [...oldArray, doc.data() as Post]);
        });
      });
  }, [userId]);

  return (
    <div>
      <img src={user?.profileImageUser} alt="UserProfileImage" />
      <p>
        {user?.firstName} {user?.lastName}
      </p>
      <img src={user?.profileImagePet} alt="PetProfileImage" />
      <p>{user?.petName}</p>
      {posts.map((post) => (
        <img key={post.id} src={post.imageUrl} alt="UserImage" />
      ))}
    </div>
  );
};
