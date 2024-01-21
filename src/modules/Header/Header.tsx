import {Link, useNavigate} from 'react-router-dom'
import { Avatar } from '@/ui' 
import { Container } from '@/ui';
import Navbar from '@/components/navbar/NavBar'
import logo from '/assets/logo.svg'
import {signOut} from "firebase/auth";
import {auth} from "@/firebase";
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu'
import { useUserStore } from '@/shared/store/userStore'
import  './Header.scss';


const Header = () => {
  const user = useUserStore(state => state.user);
  const storeSignOut = useUserStore(state => state.signOut);
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    storeSignOut();

    navigate('/login')
  }

  return (
    <header className='header'>
        <Container className='header__container'>
          <div className="header__content">
            <BurgerMenu />
            
            <Link to={'/'}>
              <Avatar img={logo} className='header__logo' />
            </Link>
            
            <div className='header__navbar'>
              <Navbar />
            </div>
        
            {/* Auth buttons */}
            <div className='header__auth'>
              <div className='header__auth-buttons'>
              {!user
              ?
                (
                    <>
                      <Link to={'/login'}>
                        <p className='header__auth-text'>Увійти</p>
                      </Link>

                      <p className='header__auth-slash'>/</p>

                      <Link to={'/registration'}>
                        <p className='header__auth-text'>Зареєструватися</p>
                      </Link>
                    </>
                )
              :
                (
                    <Link to={'/profile'}>
                      <p className='header__auth-text'>{user. username}</p>
                    </Link>
                )
              }
              </div>
              <button onClick={logout}>
                <Avatar img={user?.avatar} className={'header__avatar'} />
              </button>
            </div>
          </div>
        </Container>
    </header>
  )
}

export default Header