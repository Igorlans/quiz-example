import { Authentificator } from "@/shared/utils/Authenticator";
import { IUser } from "@/types/entities/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import AuthInput from './AuthInput/AuthInput';
import { loginSchema } from '../validation/loginSchema';
import { useAuthErrorsStore } from "@/pages/AuthPage/store/authErrorsStore";
import { useUserStore } from "@/shared/store/userStore";
import { AuthErrorCodesValues } from "../types";
import AuthForm from "./AuthForm/AuthForm";

export interface FormData {
  password: string;
  email: string;
}

const LoginForm = () => {
    const navigate = useNavigate();
    const authErrors = useAuthErrorsStore(state => state.errors)
    const loginForm = useForm<FormData>({
        resolver: yupResolver(loginSchema),
        mode: 'onBlur'
    })
    
    const clearErrors = useAuthErrorsStore(state => state.clearErrors)
    const signIn = useUserStore(state => state.signIn)

    useEffect(() => clearErrors(), []);

    const onSubmit: SubmitHandler<FormData> = async (data): Promise<IUser> => (
      new Promise(async (resolve, reject) => {
        try {
          clearErrors();
          const userData = await Authentificator.login(data.email, data.password);
          if (!userData) return;
          
          resolve(userData);
      
          signIn(userData);
          navigate('/');
        } catch (error: any) {
          reject(error.code as AuthErrorCodesValues)
        }     
    }))

    const createErrorMessage = (errorFieldType: keyof FormData) => {
      const userErrorMessage = authErrors.find(error => error.field === errorFieldType)?.message
      const formErrorMessage = loginForm.formState.errors[errorFieldType]?.message;

      const message = userErrorMessage || formErrorMessage;

      return message; 
    }

  return (
    <AuthForm<FormData>
        useFormHook={loginForm}
        onSubmit={onSubmit}
        type={'login'}
        varContents={{
          submitText: 'увійти',
          switchPath: '/registration',
          switchText: 'зареєструватися',
          title: 'Увійти'
        }}
    >
        <AuthInput 
            type={'email'}
            label='e-mail або номер телефону'
            placeholder='e-mail або номер телефону'
            error={createErrorMessage('email')}
            register={loginForm.register('email', {required: true})}
        />

        <AuthInput
            label='пароль'
            error={createErrorMessage('password')}
            register={loginForm.register('password', {required: true})}
            type='password'
            placeholder='пароль'
        />
    </AuthForm>
  )
}

export default LoginForm