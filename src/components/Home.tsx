import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { db } from '../configs/firebase';
import { Post } from '../models/Post';

export const Home: FC = () => {
  const [postInfo, setPostInfo] = useState<Post[]>([]);

  const tmp = ['bla', 's9XnffL3VuTVB1Crzz1ny2QmVUh1'];

  useEffect(() => {
    setPostInfo([]);
    db.collection('posts')
      .where('userId', 'in', tmp)
      .orderBy('uploadTime', 'desc')
      .get()
      .then((query) => {
        query.forEach((doc) => {
          setPostInfo((oldArray) => [...oldArray, doc.data() as Post]);
        });
      });
  }, []);

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
