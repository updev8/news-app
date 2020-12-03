import {
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import {
  firebaseReducer,
  getFirebase,
  actionTypes as rrfActionTypes,
} from 'react-redux-firebase';
import { FirebaseState } from '../config/rrf';
import { constants as rfConstants, firestoreReducer } from 'redux-firestore';

// https://redux-toolkit.js.org/usage/usage-guide#use-with-react-redux-firebase
// otherwise throws errors
const extraArgument = {
  getFirebase,
};

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        // just ignore every redux-firebase and react-redux-firebase action type
        ...Object.keys(rfConstants.actionTypes).map(
          (type) => `${rfConstants.actionsPrefix}/${type}`
        ),
        ...Object.keys(rrfActionTypes).map(
          (type) => `@@reactReduxFirebase/${type}`
        ),
      ],
      ignoredPaths: ['firebase', 'firestore'],
    },
    thunk: {
      extraArgument,
    },
  }),
];

export const store = configureStore({
  reducer: {
    firebase: firebaseReducer,
    firestore: firestoreReducer,
  },
  middleware,
});

export type RootState = ReturnType<typeof store.getState> & FirebaseState;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
