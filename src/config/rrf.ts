import { store } from '../store/store';
import { FirebaseReducer, FirestoreReducer } from 'react-redux-firebase';
import { firebase } from '../config/firebase';
import { createFirestoreInstance } from 'redux-firestore';

export interface Profile {
  displayName: string;
  role: 'admin' | 'author';
}

export interface News {
  title: string;
  excerpt: string;
  full: string;
  isApproved: boolean;
  createdAt?: number;
  createdBy?: string;
}

export interface Schema {
  key: string;
  news: News;
}

export type FirebaseState = {
  firebase: FirebaseReducer.Reducer<Profile, Schema>;
  firestore: FirestoreReducer.Reducer;
};

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};
