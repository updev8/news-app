import { Logo } from './Logo';
import { Menu } from './Menu';
import { UserNav } from './UserNav';
import './Header.scss';

export const Header = () => {
  return (
    <header className="header container">
      <Logo />
      <Menu />
      <UserNav />
    </header>
  );
};
