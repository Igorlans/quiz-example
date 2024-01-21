import { ValidationError, Input } from '@/ui';
import React from 'react'
import {UseFormRegisterReturn} from 'react-hook-form'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  register?: UseFormRegisterReturn;
}

const FormInput: React.FC<FormInputProps> = ({error = '', register, ...props}) => {
  return (
    <>
      <Input register={register} {...props} />
      <ValidationError message={error} />
    </>
  )
}

export default FormInput