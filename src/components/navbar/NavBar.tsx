import React from 'react'
import './NavBar.scss'
import NavBarLink from './NavBarLink';

interface NavBarProps {
  children?: React.ReactNode;
  onLinkClick?: (e: React.MouseEvent<HTMLButtonElement>) => any;
}

const NavBar: React.FC<NavBarProps> = ({ children, onLinkClick }) => {
  return (
    <nav className={`navbar`}>
      <ul className='navbar__list'>
        <NavBarLink to='/games' onClick={(e) => onLinkClick && onLinkClick(e)}>
          Наші ігри
        </NavBarLink>

        <NavBarLink to='/events' onClick={(e) => onLinkClick && onLinkClick(e)}>
          Івенти
        </NavBarLink>

        <NavBarLink to='/donate' onClick={(e) => onLinkClick && onLinkClick(e)}>
          Донати
        </NavBarLink>

        {children}
      </ul>
    </nav>
  )
}

export default NavBar