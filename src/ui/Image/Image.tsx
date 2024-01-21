import { FC, ImgHTMLAttributes } from 'react';
import classes from './image.module.scss';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

const Image: FC<ImageProps> = ({ className , ...props}) => {
  return (
    <div className={`${classes['container']} ${className}`}>
        <img className={classes['image']} {...props} />
    </div>
  )
}

export default Image