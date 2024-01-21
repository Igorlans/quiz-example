import {useNavigate} from "react-router-dom";
import {RiGoogleFill} from 'react-icons/ri';
import {RiFacebookFill} from 'react-icons/ri';
import { Authentificator } from '@/shared/utils/Authenticator';
import { useUserStore } from '@/shared/store/userStore';
import './OAuth.scss';

const OAuth = () => {
    const navigate = useNavigate();

    const signIn = useUserStore(state => state.signIn)

    const googleAuth = async () => {
        try {
            const userData = await Authentificator.googleLogin();

            if (!userData) return;

            signIn(userData);
            navigate('/');
        } catch (e) {
            console.log("🚀 ~ file: OAuth.tsx:22 ~ googleAuth ~ e:", e)
        }
    }


    const facebookAuth = async () => {
        try {
            await Authentificator.facebookLogin();
        } catch (e) {
            console.log("🚀 ~ file: OAuth.tsx:31 ~ facebookAuth ~ e:", e)
        }
    }

  return (
        <div className='oauth'>
            <button className='oauth__btn' onClick={googleAuth}>
                <RiGoogleFill color='#fff' />
            </button>
        
            <button className='oauth__btn' onClick={facebookAuth}>
                <RiFacebookFill color='#fff' />
            </button>
        </div>
  )
}

export default OAuth;