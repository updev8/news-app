import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const Profile = () => {
  const displayName = useSelector(
    (state: RootState) => state.firebase.profile.displayName
  );

  return (
    <div>
      <h2>Привет, {displayName || 'Гость'}</h2>
    </div>
  );
};
