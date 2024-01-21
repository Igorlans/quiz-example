import { Input, ValidationError } from '@/ui'
import { FC } from 'react';
import './AuthInput.scss'
import { InputProps } from '@/ui/Input/Input';

interface AuthInputProps extends InputProps  {
    error?: string;
    label: string;
}

const AuthInput: FC<AuthInputProps> = ({ error, label, ...inputProps }) => {
  return (
    <div className="auth-input">
        <label className='auth-input__label'>{label}</label>
        <Input className='auth-input__input' {...inputProps} />
        <ValidationError message={error ?? ''} />
    </div> 
  )
}

export default AuthInput