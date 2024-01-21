import { useState } from 'react'
import BurgerButton from './BurgerButton'
import { Backdrop } from '@/ui';
import NavBar from '../navbar/NavBar'
import NavBarLink from '../navbar/NavBarLink'
import './BurgerMenu.scss'

const BurgerMenu = () => {
  const [opened, setOpened] = useState(false);

  const close = () => setOpened(false);

  return (
    <div className={`header__burger burger ${opened ? 'active' : ''}`}>
      <BurgerButton setOpened={setOpened} />

      <div className="burger__backdrop">
        <Backdrop />
      </div>

      <div className="burger__content">
        <NavBar onLinkClick={close}>
          <NavBarLink to='qr' onClick={close}>
            Сканер QR
          </NavBarLink>
        </NavBar>
      </div>
    </div>
  )
}

export default BurgerMenu