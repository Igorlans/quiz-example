
import { ReactNode, useEffect } from "react";
import { UseFormReturn, FieldValues } from 'react-hook-form'
import { Button } from '@/ui';
import { Link } from 'react-router-dom';
import OAuth from '../OAuth/OAuth';
import { useAuthErrorsStore } from "@/pages/AuthPage/store/authErrorsStore";
import { AuthErrorCodesValues } from "../../types";
import './AuthForm.scss'
import { handleErrorTransform } from "../../handlers/handleErrorTransform";

interface AuthFormProps<FormDataType extends FieldValues> {
    onSubmit: (data: FormDataType) => Promise<any>;
    useFormHook: UseFormReturn<FormDataType, any>
    children: ReactNode;
    type: 'login' | 'registration'
    varContents: {
        title: string;
        switchText: string;
        switchPath: string;
        submitText: string;
    }
}

function AuthForm<FormDataType extends FieldValues>({ onSubmit, children, varContents, useFormHook: { handleSubmit, reset, formState }}: AuthFormProps<FormDataType>) {
    const addError = useAuthErrorsStore(state => state.addError)
    const clearErrors = useAuthErrorsStore(state => state.clearErrors)

    useEffect(() => clearErrors(), []);
    
    return (
        <div className="auth-form">
        <h1 className='auth-form__title'>{varContents.title}</h1>
        <form 
            className='auth-form__form'
            onSubmit={(e) => {
                handleSubmit((data) => {
                    onSubmit(data)
                        .then(() => {
                            formState.isValid && reset()
                            clearErrors()
                        })
                        .catch((e: AuthErrorCodesValues) => {
                          const error = handleErrorTransform(e);

                          error && addError(error)
                        })
                })(e);
            }} 
        >
            <div className="auth-form__inputs">  
                {children}
            </div>

            <div className="auth-form__buttons"> 
                <Link to={varContents.switchPath} className="auth-form__form-switch">{varContents.switchText}</Link>
                <Button  className='flex-[1_1] py-2.5 px-8 sm:text-sm sm:py-2 sm:px-5' type='submit'>
                    {varContents.submitText}
                </Button>
            </div>
        </form>

        {/* services auth */}
        <div className='auth-form__oauth'>
            <h5 className='auth-form__oauth-title'>або увійти за допомогою соц. мереж</h5>
            <OAuth />
        </div>
    </div>
  )
}

export default AuthForm