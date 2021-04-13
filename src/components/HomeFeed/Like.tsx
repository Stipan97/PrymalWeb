import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../configs/firebase';
import { Post } from '../../models/Post';
import { RootReducerState } from '../../models/RootReducer';

interface LikeProps {
  postId: string;
  userId: string;
}

export const Like: FC<LikeProps> = ({ postId, userId }) => {
  const currentUser = useSelector((state: RootReducerState) => state.user.data);
  const [buttonState, setButtonState] = useState(false);

  const onClickLike = () => {
    //dodajem like
    db.collection('likes').add({
      fromUser: currentUser?.id,
      toPost: postId,
    });

    //like notifikacija
    let time = Date.now();
    const notifRef = db.collection('notifications').doc();
    notifRef.set({
      id: notifRef.id,
      fromUserId: currentUser?.id,
      toUserId: userId,
      type: 'Liked your post.',
      notifTime: time,
    });

    //updateam broj likeova na postu
    db.collection('posts')
      .doc(postId)
      .get()
      .then((query) => {
        let likeCounter = (query.data() as Post).likes;
        db.collection('posts')
          .doc(postId)
          .update({ likes: likeCounter + 1 });
      });

    setButtonState(true);
  };

  const onClickUnLike = () => {
    //brišem like
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

    //updateam broj likeova na postu
    db.collection('posts')
      .doc(postId)
      .get()
      .then((query) => {
        let likeCounter = (query.data() as Post).likes;
        db.collection('posts')
          .doc(postId)
          .update({ likes: likeCounter - 1 });
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
        <button className="btn-like" onClick={onClickUnLike}>
          Unlike
        </button>
      ) : (
        <button className="btn-like" onClick={onClickLike}>
          Like
        </button>
      )}
    </div>
  );
};
