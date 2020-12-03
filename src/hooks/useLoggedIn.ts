import { useSelector } from 'react-redux';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { RootState } from '../store/store';

export const useLoggedIn = () => {
  const auth = useSelector((state: RootState) => state.firebase.auth);
  const isLoggedIn = isLoaded(auth) && !isEmpty(auth);

  return { isLoggedIn };
};
