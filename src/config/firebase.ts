import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp({
  apiKey: 'AIzaSyBO6OLMQLSP9v_JylH1GsWO0RsISN6u8j0',
  authDomain: 'news-e5797.firebaseapp.com',
  databaseURL: 'https://news-e5797.firebaseio.com',
  projectId: 'news-e5797',
  storageBucket: 'news-e5797.appspot.com',
  messagingSenderId: '57596569799',
  appId: '1:57596569799:web:3f1d828e2ad1d14ca0b6e2',
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const database = firebase.database();

export { firebase };
