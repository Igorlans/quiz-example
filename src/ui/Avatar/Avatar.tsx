
import { HTMLAttributes, useRef } from 'react';
import AnonymousAvatar from '@/assets/images/anonymousAvatar.png';
import classes from './avatar.module.scss';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  img?: string;
  alt?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({img = '', alt, className, ...props}) => {
  const imageRef = useRef<Maybe<HTMLImageElement>>(null);

  const onError = () => {
    if (imageRef.current?.src) {
      imageRef.current.src = AnonymousAvatar
    }
  }

  return (
    <div className={classes.avatar + ' ' + className} {...props}>
      <img 
        src={img} 
        alt={alt}
        ref={imageRef}
        onError={onError}
      />
    </div>
  )
}

export default Avatar