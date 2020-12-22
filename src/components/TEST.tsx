import React, { ChangeEvent } from 'react';
import { FC } from 'react';
import { storage } from '../configs/firebase';

export const Test: FC = () => {
  let file: File | null | undefined;

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.files?.item(0));

    file = event.currentTarget.files?.item(0);
  };

  const onClickUpload = () => {
    if (file) {
      storage
        .ref('test/' + file.name)
        .put(file)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            console.log(url);
          });
        });
    }
  };

  return (
    <>
      <input onChange={onChangeFile} type="file" id="myfile" name="myfile" />
      <button onClick={onClickUpload}>Upload</button>
    </>
  );
};
