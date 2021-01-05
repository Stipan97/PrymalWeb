import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../configs/firebase';
import { Post } from '../../models/Post';
import { User } from '../../models/User';
import './Profile.css';

interface ProfileProps {
  userId: string;
}

export const Profile: FC = () => {
  const { userId } = useParams<ProfileProps>();
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
    <div className="profile-container">
      <div className="info-container">
        <div className="info-item">
          <div className="image-container">
            <img
              className="image profile-img"
              src={user?.profileImageUser}
              alt="UserProfileImage"
            />
          </div>
          <p>
            {user?.firstName} {user?.lastName}
          </p>
        </div>
        <div className="info-item">
          <div className="image-container">
            <img
              className="image profile-img"
              src={user?.profileImagePet}
              alt="PetProfileImage"
            />
          </div>

          <p>{user?.petName}</p>
        </div>
      </div>
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="image-container post-list">
            <img
              className="image"
              key={post.id}
              src={post.imageUrl}
              alt="UserImage"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
