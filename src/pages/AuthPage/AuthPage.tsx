import {Modal} from '@/ui'
import { FC } from 'react'
import './AuthPage.scss';
import {MainPage} from '@/pages/MainPage';
import { useNavigate } from 'react-router';
import { LoginForm, RegistrationForm } from '@/modules/AuthForm';

interface AuthProps {
  authType: 'login' | 'registration'
}

const AuthPage: FC<AuthProps> = ({authType}) => {
  const navigate = useNavigate();

  return (
    <div className='auth-page'>
        <MainPage />
        <Modal className='auth-page__form-modal' close={() => navigate('/')}>
          {authType === 'login' && (
            <LoginForm />
          )}

          {authType === 'registration' && (
            <RegistrationForm />
          )}
        </Modal>
    </div>
  )
}

export default AuthPage