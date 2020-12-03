import { Link } from 'react-router-dom';
import imgLogo from '../images/logo.svg';

export const Logo = () => {
  return (
    <div className="logo">
      <Link to="/">
        <img src={imgLogo} width="35" height="36" alt="a website with news" />
      </Link>
    </div>
  );
};
