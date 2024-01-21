import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@/ui'

interface NavBarLinkProps {
    to: string;
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any;
}

const NavBarLink: React.FC<NavBarLinkProps> = ({ children, to, onClick }) => {
  return (
    <li className='navbar__list-item'>
        <NavLink
            className={'navbar__link'}
            to={to}
        >
            {(state) => (
                <Button onClick={(e) => onClick && onClick(e)} className='py-2.5 px-8 text-lg md:bg-custom_purple-700 md:text-white' isActive={state.isActive}>
                    {children}
                </Button>
            )}
        </NavLink>
    </li>
  )
}

export default NavBarLink