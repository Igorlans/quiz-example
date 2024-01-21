import React from 'react'
import {UseFormRegisterReturn} from 'react-hook-form'
import classes from './input.module.scss';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
}

const Input: React.FC<InputProps> = ({ register, className, ...props}) => {
  return (
    <input className={`${classes.input} ${className}`} {...register} {...props} />
  )
}

export default Input