import { ACCEPTED_IMAGE_TYPES } from '@/constants/acceptedImageTypes';
import { Button } from '@/ui'
import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { IoIosCamera } from 'react-icons/io';
import classes from './image-input.module.scss';

interface ImageInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
}

const ImageInput: React.FC<ImageInputProps> = ({ register = [], className, ...props }) => {
  return (
    <Button type='button' className={`${classes['image-input']} ${className || ''}`}>
      <input 
        className={classes['image-input__input']} 
        type={'file'} 
        accept={ACCEPTED_IMAGE_TYPES.join(', ')} 
        {...register}
        {...props}
      />
    
      <div className={classes['image-input__interface']}>
        <div className={classes['image-input__svg']}>
            <IoIosCamera width={'100%'} />
        </div>

        <p>Додати фото</p>
      </div>
    </Button>
  );
};

export default ImageInput;
