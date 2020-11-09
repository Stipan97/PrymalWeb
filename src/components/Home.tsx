import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../configs/firebase';
import { Follow } from '../models/Follow';
import { Post } from '../models/Post';
import { RootReducerState } from '../models/RootReducer';

export const Home: FC = () => {
  const currentUser = useSelector((state: RootReducerState) => state.user.data);
  const [postInfo, setPostInfo] = useState<Post[]>([]);
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
        })
        .finally(() => {
          setPostInfo([]);
          db.collection('posts')
            .where('userId', 'in', followedUsersId)
            .orderBy('uploadTime', 'desc')
            .get()
            .then((query) => {
              query.forEach((doc) => {
                setPostInfo((oldArray) => [...oldArray, doc.data() as Post]);
              });
            });
        });
    }
  }, [currentUser]);

  return (
    <>
      {postInfo.map((post) => (
        <div key={post.id}>
          <p>{post.postName}</p>
          <img src={post.imageUrl} alt="postImg" />
          <p>{post.description}</p>
          <button>Like</button>
          <p>{post.likes} likes</p>
        </div>
      ))}
    </>
  );
};
