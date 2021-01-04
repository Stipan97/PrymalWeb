import React from 'react';
import { ChangeEvent, FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { db, storage } from '../../configs/firebase';
import { RootReducerState } from '../../models/RootReducer';
import './UploadPost.css';

export const UploadPost: FC = () => {
  const currentUser = useSelector((state: RootReducerState) => state.user.data);
  const [description, setDescription] = useState('');
  const [fileUrlPreview, setFileUrlPreview] = useState('');
  const [file, setFile] = useState<File | null | undefined>(null);
  const [uploadType, setUploadType] = useState('');
  const browserHistory = useHistory();

  const onChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.currentTarget.value);
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.currentTarget.files?.item(0));
    setFileUrlPreview(URL.createObjectURL(event.currentTarget.files?.item(0)));
  };

  const onClickUpload = () => {
    if (uploadType === 'post') {
      uploadPost();
    } else if (uploadType === 'user') {
      uploadUser();
    } else if (uploadType === 'pet') {
      uploadPet();
    }
  };

  const uploadPost = () => {
    if (file) {
      let time = Date.now();
      storage
        .ref('images/' + currentUser?.id + '-' + time)
        .put(file)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            const postsRef = db.collection('posts').doc();
            postsRef
              .set({
                id: postsRef.id,
                description: description,
                imageUrl: url,
                postName:
                  currentUser?.firstName +
                  ' ' +
                  currentUser?.lastName +
                  ' - ' +
                  currentUser?.petName,
                userId: currentUser?.id,
                uploadTime: time,
                likes: 0,
              })
              .then(() => {
                browserHistory.push('/home');
              });
          });
        });
    }
  };

  const uploadUser = () => {
    if (file) {
      let time = Date.now();
      storage
        .ref('images/' + currentUser?.id + '-' + time)
        .put(file)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            const userRef = db.collection('users').doc(currentUser?.id);
            userRef.update({ profileImageUser: url }).then(() => {
              browserHistory.push(`/profile/${currentUser?.id}`);
            });
          });
        });
    }
  };

  const uploadPet = () => {
    if (file) {
      let time = Date.now();
      storage
        .ref('images/' + currentUser?.id + '-' + time)
        .put(file)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            const userRef = db.collection('users').doc(currentUser?.id);
            userRef.update({ profileImagePet: url }).then(() => {
              browserHistory.push(`/profile/${currentUser?.id}`);
            });
          });
        });
    }
  };

  return (
    <>
      {currentUser ? (
        <div className="upload-container">
          <div className="preview-container">
            <img className="image-preview" src={fileUrlPreview} alt="" />
          </div>
          <div className="upload-info">
            <div className="description-container">
              {uploadType === 'post' ? (
                <input
                  className="input-description"
                  onChange={onChangeDescription}
                  type="text"
                  name="description"
                  placeholder="Description"
                />
              ) : (
                <input
                  className="input-description"
                  type="text"
                  name="description"
                  placeholder="Description"
                  disabled
                />
              )}
            </div>
            <div className="choose-upload">
              <div className="radio-container">
                <input
                  className="radio-input"
                  type="radio"
                  value="Post"
                  name="type"
                  onClick={() => setUploadType('post')}
                />
                <span className="radio-label">Post</span>
              </div>
              <div className="radio-container">
                <input
                  className="radio-input"
                  type="radio"
                  value="User Image"
                  name="type"
                  onClick={() => setUploadType('user')}
                />
                <span className="radio-label">User profile image</span>
              </div>
              <div className="radio-container">
                <input
                  className="radio-input"
                  type="radio"
                  value="Pet Image"
                  name="type"
                  onClick={() => setUploadType('pet')}
                />
                <span className="radio-label">Pet profile image</span>
              </div>
            </div>
            <input
              className="item-input"
              onChange={onChangeFile}
              type="file"
              id="myfile"
              name="myfile"
            />
            {file && uploadType ? (
              <button className="btn-upload" onClick={onClickUpload}>
                Upload
              </button>
            ) : (
              <button className="btn-upload" disabled>
                Upload
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>You need to be logged in.</div>
      )}
    </>
  );
};
