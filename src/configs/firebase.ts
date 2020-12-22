import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA3gqCl3_quuXrrVtiAIRRMvfCYo0cigy8',
  authDomain: 'prymalweb.firebaseapp.com',
  databaseURL: 'https://prymalweb.firebaseio.com',
  projectId: 'prymalweb',
  storageBucket: 'prymalweb.appspot.com',
  messagingSenderId: '871837280744',
  appId: '1:871837280744:web:ef6019427800de8abd1c5d',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
