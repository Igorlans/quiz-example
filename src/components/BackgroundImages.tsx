import React from 'react'
import thunderBg from '@/assets/images/background/thunder.png';
import cupBg from '@/assets/images/background/cup.png';
import heartBg from '@/assets/images/background/heart.png';
import purpleEllipseBg from '@/assets/images/background/main-bg-ellipse.png';
import hand from '@/assets/images/background/hand.png';

interface BackgroundImagesProps {
  variant: number;
}

const BackgroundImages: React.FC<BackgroundImagesProps> = ({variant}) => {
  return (
    <div className={`bg__variant-${variant} bg__variant`}>  
        <div className="bg__image bg__thunder"><img src={thunderBg} alt="bg" /></div>
        <div className="bg__image bg__cup"><img src={cupBg} alt="bg" /></div>
        <div className="bg__image bg__heart"><img src={heartBg} alt="bg" /></div>

        {variant === 1 && (
          <>
            <div className="bg__image bg__ellipse"><img src={purpleEllipseBg} alt="bg" /></div>
            <div className="bg__image bg__hand"><img src={hand} alt="bg" /></div>
          </>
        )}

        {variant === 3 && (
          <>
            <div className="bg__image bg__thunder-2"><img src={thunderBg} alt="bg" /></div>
            <div className="bg__image bg__cup-2"><img src={cupBg} alt="bg" /></div>
            <div className="bg__image bg__heart-2"><img src={heartBg} alt="bg" /></div>
          </>
        )}
      </div>
  )
}

export default BackgroundImages