import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import './LoginForm.scss';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

interface AuthErrorMsg {
  [key: string]: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authError = useSelector((state: RootState) => state.firebase.authError);

  const authErrorMsg: AuthErrorMsg = {
    'auth/wrong-password': 'Неверный пароль',
    'auth/invalid-email': 'Неверный email',
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {authError && <p>{authErrorMsg[authError.code]}</p>}

      <label className="login-form__field">
        email
        <input
          className="login-form__input"
          type="text"
          placeholder="example@example.com"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="login-form__field">
        пароль
        <input
          className="login-form__input"
          type="password"
          placeholder="123456"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button type="submit">Войти</button>
    </form>
  );
};
