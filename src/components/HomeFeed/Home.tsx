import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../configs/firebase';
import { Follow } from '../../models/Follow';
import { Post } from '../../models/Post';
import { RootReducerState } from '../../models/RootReducer';
import { Like } from './Like';
import './Home.css';
import { User } from '../../models/User';

export const Home: FC = () => {
  const currentUser = useSelector((state: RootReducerState) => state.user.data);
  const [postInfo, setPostInfo] = useState<Post[]>([]);
  const [userProfileImage, setUserProfileImage] = useState('');
  let followedUsersId: string[] = [];

  useEffect(() => {
    if (currentUser) {
      followedUsersId.push(currentUser.id);
      db.collection('follows')
        .where('fromUserFollow', '==', currentUser.id)
        .get()
        .then((query) => {
          query.forEach((doc) => {
            followedUsersId.push((doc.data() as Follow).toUserFollow);
          });

          // setPostInfo([]);
          // db.collection('posts')
          //   .where('userId', 'in', followedUsersId)
          //   .orderBy('uploadTime', 'desc')
          //   .get()
          //   .then((query) => {
          //     query.forEach((doc) => {
          //       setPostInfo((oldArray) => [...oldArray, doc.data() as Post]);
          //     });
          //   });

          db.collection('users')
            .doc(currentUser.id)
            .get()
            .then((query) => {
              setUserProfileImage((query.data() as User).profileImageUser);
            });
        });

      const unsubscribe = db
        .collection('posts')
        .where('userId', 'in', followedUsersId)
        .orderBy('uploadTime', 'desc')
        .onSnapshot({ includeMetadataChanges: true }, (query) => {
          setPostInfo([]);
          query.forEach((doc) => {
            setPostInfo((oldArray) => [...oldArray, doc.data() as Post]);
          });
        });

      return () => unsubscribe();
    }
  }, [currentUser]);

  return (
    <div className="home-container">
      {currentUser ? (
        postInfo.map((post) => (
          <div key={post.id} className="post-container">
            <div className="post-label">
              <div className="post-profile-img-container">
                <img
                  className="post-profile-img"
                  src={userProfileImage}
                  alt="profileImg"
                />
              </div>
              <h2 className="post-name">{post.postName}</h2>
            </div>
            <div className="post-img-container">
              <img className="post-img" src={post.imageUrl} alt="postImg" />
            </div>
            <p>{post.description}</p>
            <p>{post.likes} likes</p>
            <Like postId={post.id} userId={currentUser?.id} />
          </div>
        ))
      ) : (
        <div>You are not logged in.</div>
      )}
    </div>
  );
};
