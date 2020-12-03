import { NavLink } from 'react-router-dom';
import './Menu.scss';

interface NavLinks {
  id: number;
  title: string;
  path: string;
}

const NAV_LINKS: NavLinks[] = [
  { id: 1, title: 'Главная', path: '/' },
  { id: 2, title: 'Новости', path: '/news' },
];

export const Menu = () => {
  return (
    <nav className="menu">
      <ul className="menu__list">
        {NAV_LINKS.map(({ id, path, title }) => (
          <li className="menu__item" key={id}>
            <NavLink className="menu__link" exact to={path}>
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
