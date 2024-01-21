import React from 'react'

interface BurgerButtonProps {
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const BurgerButton: React.FC<BurgerButtonProps> = ({ setOpened }) => {
    const handleClick = () => {
      setOpened(opened => !opened);
    }

  return (
    <button onClick={handleClick} className='burger__button'>
        <span className="burger__button-line"></span>
        <span className="burger__button-line"></span>
        <span className="burger__button-line"></span>
        <span className="burger__button-line"></span>
    </button>
  )
}

export default BurgerButton