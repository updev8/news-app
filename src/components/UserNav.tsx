import { useEffect, useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';
import { useLoggedIn } from '../hooks/useLoggedIn';
import { LoginForm } from './LoginForm';
import { Modal } from './Modal';
import './UserNav.scss';

export const UserNav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useLoggedIn();
  const { logout, login } = useFirebase();
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) setIsModalOpen(false);
  }, [isLoggedIn]);

  const handleSubmit = (email: string, password: string) => {
    login({ email, password });
  };

  const handleLogout = () => {
    logout();
    history.go(0);
  };

  return (
    <div className="user-nav">
      <ul className="user-nav__list">
        <li>
          <button
            className="user-nav__button"
            onClick={() => (isLoggedIn ? handleLogout() : setIsModalOpen(true))}
          >
            {isLoggedIn ? 'Выйти' : 'Войти'}
          </button>
        </li>
      </ul>

      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <LoginForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
};
