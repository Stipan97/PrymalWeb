import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../configs/firebase';
import { Post } from '../../models/Post';
import { RootReducerState } from '../../models/RootReducer';

interface LikeProps {
  postId: string;
  userId: string;
  onchange: Function;
}

export const Like: FC<LikeProps> = ({ postId, userId, onchange }) => {
  const currentUser = useSelector((state: RootReducerState) => state.user.data);
  const [buttonState, setButtonState] = useState(false);

  const onClickLike = () => {
    db.collection('likes').add({
      fromUser: currentUser?.id,
      toPost: postId,
    });

    let time = Date.now();
    const notifRef = db.collection('notifications').doc();
    notifRef.set({
      id: notifRef.id,
      fromUserId: currentUser?.id,
      toUserId: userId,
      type: 'Liked your post.',
      notifTime: time,
    });

    db.collection('posts')
      .doc(postId)
      .get()
      .then((query) => {
        let likeCounter = (query.data() as Post).likes;
        db.collection('posts')
          .doc(postId)
          .update({ likes: likeCounter + 1 });
        onchange();
      });

    setButtonState(true);
  };

  const onClickUnLike = () => {
    db.collection('likes')
      .where('fromUser', '==', currentUser?.id)
      .where('toPost', '==', postId)
      .get()
      .then((query) => {
        query.forEach((doc) => {
          db.collection('likes').doc(doc.id).delete();
        });
        setButtonState(false);
      });

    db.collection('posts')
      .doc(postId)
      .get()
      .then((query) => {
        let likeCounter = (query.data() as Post).likes;
        db.collection('posts')
          .doc(postId)
          .update({ likes: likeCounter - 1 });
        onchange();
      });
  };

  useEffect(() => {
    if (currentUser) {
      db.collection('likes')
        .where('fromUser', '==', currentUser.id)
        .where('toPost', '==', postId)
        .get()
        .then((query) => {
          query.forEach(() => {
            setButtonState(true);
          });
        });
    }
  }, [currentUser]);

  return (
    <div>
      {buttonState ? (
        <div>
          <button className="btn-like" onClick={onClickUnLike}>
            Unlike
          </button>
        </div>
      ) : (
        <div>
          <button className="btn-like" onClick={onClickLike}>
            Like
          </button>
        </div>
      )}
    </div>
  );
};
