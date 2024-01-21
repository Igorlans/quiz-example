import { Authentificator } from '@/shared/utils/Authenticator';
import { IUser } from "@/types/entities/user";
import { FirebaseErrorMessage } from '@/types';
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import AuthInput from './AuthInput/AuthInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from '../validation/registrationSchema';
import { useEffect } from 'react';
import { useAuthErrorsStore } from '@/pages/AuthPage/store/authErrorsStore';
import { useUserStore } from '@/shared/store/userStore';
import AuthForm from './AuthForm/AuthForm';

export interface FormData {
  password: string;
  email: string;
  username: string;
}

const RegistrationForm = () => {
    const navigate = useNavigate();
    const registrationForm = useForm<FormData>({
        resolver: yupResolver(registrationSchema),
        mode: 'onBlur'
    })
    const clearErrors = useAuthErrorsStore(state => state.clearErrors)
    const authErrors = useAuthErrorsStore(state => state.errors)
    const signIn = useUserStore(state => state.signIn)

    useEffect(() => clearErrors(), []);

    const createErrorMessage = (errorFieldType: keyof FormData) => {
      const userErrorMessage = authErrors.find(error => error.field === errorFieldType)?.message
      const formErrorMessage = registrationForm.formState.errors[errorFieldType]?.message;

      const message = userErrorMessage || formErrorMessage;

      return message; 
    }

    const onSubmit: SubmitHandler<FormData> = async (data): Promise<IUser> => (
        new Promise(async (resolve, reject) => {
            try {
                clearErrors();
                const userData = await Authentificator.register(data.email, data.password, data.username); 
                if (!userData) return;

                resolve(userData);
                
                signIn(userData);
                navigate('/');
            } catch (error: any) {
                reject(error.code as FirebaseErrorMessage)
            }     
    }))
  
  return (
    <AuthForm<FormData>
        onSubmit={onSubmit}
        type='registration'
        useFormHook={registrationForm}
        varContents={{
            submitText: 'зареєструватися',
            switchPath: '/login',
            switchText: 'в мене вже є аккаунт',
            title: 'Реєстрація'
        }}
    >
        <AuthInput 
            label={`ім'я користувача`}
            placeholder={'ім\'я користувача'}
            register={registrationForm.register('username', {required: true})}
            error={createErrorMessage('username')}
        />    

        <AuthInput 
            type={'email'}
            label='e-mail або номер телефону'
            placeholder='e-mail або номер телефону'
            error={createErrorMessage('email')}
            register={registrationForm.register('email', {required: true})}
        />

        <AuthInput
            label='пароль'
            error={createErrorMessage('password')}
            register={registrationForm.register('password', {required: true})}
            type='password'
            placeholder='пароль'
        />
    </AuthForm>
  )
}

export default RegistrationForm
